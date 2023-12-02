using Npgsql;
using PayPolish.Models;
using System;
using System.Data;
using System.Globalization;

namespace PayPolish.DataAccessLayer
{
    public class FinalDataAccessLayer
    {
        #region Get Connection String
        public NpgsqlConnection Connect()
        {
            /*string str = "Server=localhost;Username=postgres;Database=PayPolish;Port=5000;Password=ram;";*/
            string str = "Server=dpg-cl1na40p2gis73ffeq3g-a.oregon-postgres.render.com;Username=prashant;Database=PayPolish;Port=5432;Password=H8Rvy0XgZz9mFOsx8rkiiJIGYh6ojmF5;";
            return new NpgsqlConnection(str);
        }
        #endregion

        #region Get Master Data
        public List<MasterModel> GetMasterData(out bool status)
        { 
            List<MasterModel> master = new List<MasterModel>();
            NpgsqlConnection con = Connect();
            DataTable table = new DataTable();
            try
            {
                DataSet dt = new DataSet();
                string Query = "select final.spgetmaster('ref1');FETCH ALL IN \"ref1\";";

                con.Open();
                NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(Query, con);
                adapter.Fill(dt);

                table = dt.Tables[1];

                master = (from DataRow row in table.Rows

                          select new MasterModel
                          {
                              ID = (int)row["p_id"],
                              Type = row["p_type"].ToString(),
                              Date = row["p_date"].ToString(),
                              Recieve = (float)(decimal)row["p_recieve"],
                              Issue = (float)(decimal)row["p_issue"],
                              Pick = (float)(decimal)row["p_pick"],
                              Touch = (float)(decimal)row["p_touch"],
                              Loss = (float)(decimal)row["p_loss"],
                              Fine = (float)(decimal)row["p_fine"],
                              isdeleted = (bool)row["isdeleted"],
                              CreatedOn = row["createdon"].ToString(),

                          }).ToList();

                status = true;
                return master;
            }
            catch (Exception ex)
            {
                status = false;
                return master;
            }
            finally
            {
                con.Close();
            }
        }
        #endregion


        #region Add Master Data
        public bool AddMasterData(MasterModel data, out bool status)
        {
            bool master = true;
            NpgsqlConnection con = Connect();
            DataTable table = new DataTable();
            try
            {
                data.Date = Convert.ToDateTime(data.Date).Date.ToString("yyyy-MM-dd");

                DataSet dt = new DataSet();
                string Query = @$"select final.spaddmaster('{data.Type}','{data.Date}','{data.Recieve}','{data.Issue}','{data.Pick}','{data.Touch}','{data.Loss}','{data.Fine}');";

                con.Open();
                NpgsqlCommand adapter = new NpgsqlCommand(Query, con);
                adapter.ExecuteNonQuery();

                status = true;
                return master;
            }
            catch (Exception ex)
            {
                status = false;
                master = false;
                return master;
            }
            finally
            {
                con.Close();
            }
        }
        #endregion


        #region Edit Master Data
        public bool EditMasterData(MasterModel data, out bool status)
        {
            bool master = true;
            NpgsqlConnection con = Connect();
            DataTable table = new DataTable();
            try
            {
                /*data.Date = Convert.ToDateTime(data.Date).Date.ToString("yyyy-MM-dd");*/

                DataSet dt = new DataSet();
                string Query = @$"select final.spupdatemaster('{data.ID}','{data.Type}','{data.Date}','{data.Recieve}','{data.Issue}','{data.Pick}','{data.Touch}','{data.Loss}','{data.Fine}');";

                con.Open();
                NpgsqlCommand adapter = new NpgsqlCommand(Query, con);
                bool res = (bool)adapter.ExecuteScalar();

                status = true;
                return master;
            }
            catch (Exception ex)
            {
                status = false;
                master = false;
                return master;
            }
            finally
            {
                con.Close();
            }
        }
        #endregion


        #region Delete Master Data
        public bool DeleteMasterData(MasterModel data, out bool status)
        {
            bool master = true;
            NpgsqlConnection con = Connect();
            DataTable table = new DataTable();
            try
            {
                DataSet dt = new DataSet();
                string Query = @$"select final.spdeletemaster('{data.ID}');";

                con.Open();
                NpgsqlCommand adapter = new NpgsqlCommand(Query, con);
                bool res = (bool)adapter.ExecuteScalar();

                status = true;
                return master;
            }
            catch (Exception ex)
            {
                status = false;
                master = false;
                return master;
            }
            finally
            {
                con.Close();
            }
        }
        #endregion


        #region Filter Master Data
        public List<MasterModel> FilterMasterData(DateModel data, out bool status)
        {
            NpgsqlConnection con = Connect();
            DataTable table = new DataTable();
            List<MasterModel> master = new List<MasterModel>();
            try
            {
                DateTime current = Convert.ToDateTime(data.Current);
                DateTime previous = Convert.ToDateTime(data.Previous);

                DataSet dt = new DataSet();
                string Query = @$"select final.spgetdatabymonthmaster('{data.Current}','{data.Previous}','ref1');FETCH ALL IN ""ref1"";";

                con.Open();
                NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(Query, con);
                adapter.Fill(dt);

                table = dt.Tables[1];

                master = (from DataRow row in table.Rows

                          select new MasterModel
                          {
                              ID = (int)row["p_id"],
                              Type = row["p_type"].ToString(),
                              Date = row["p_date"].ToString(),
                              Recieve = (float)(decimal)row["p_recieve"],
                              Issue = (float)(decimal)row["p_issue"],
                              Pick = (float)(decimal)row["p_pick"],
                              Touch = (float)(decimal)row["p_touch"],
                              Loss = (float)(decimal)row["p_loss"],
                              Fine = (float)(decimal)row["p_fine"],
                              isdeleted = (bool)row["isdeleted"],
                              CreatedOn = row["createdon"].ToString(),

                          }).ToList();

                status = true;
                return master;
            }
            catch (Exception ex)
            {
                status = false;
                return master;
            }
            finally
            {
                con.Close();
            }
        }
        #endregion


        #region Filter By Date  Data
        public List<MasterModel> FilterMasterByDate(DateModel data, out bool status)
        {
            NpgsqlConnection con = Connect();
            DataTable table = new DataTable();
            List<MasterModel> master = new List<MasterModel>();

            try
            {
                DateTime current = Convert.ToDateTime(data.Current).Date.AddDays(1);

                /*string current = data.Current;*/

                DataSet dt = new DataSet();
                string Query = @$"select final.spgetbydatemaster('{current}','ref1');FETCH ALL IN ""ref1"";";

                con.Open();
                NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(Query, con);
                adapter.Fill(dt);

                table = dt.Tables[1];

                master = (from DataRow row in table.Rows

                          select new MasterModel
                          {
                              ID = (int)row["p_id"],
                              Type = row["p_type"].ToString(),
                              Date = row["p_date"].ToString(),
                              Recieve = (float)(decimal)row["p_recieve"],
                              Issue = (float)(decimal)row["p_issue"],
                              Pick = (float)(decimal)row["p_pick"],
                              Touch = (float)(decimal)row["p_touch"],
                              Loss = (float)(decimal)row["p_loss"],
                              Fine = (float)(decimal)row["p_fine"],
                              isdeleted = (bool)row["isdeleted"],
                              CreatedOn = row["createdon"].ToString(),

                          }).ToList();

                status = true;
                return master;
            }
            catch (Exception ex)
            {
                status = false;
                return master;
            }
            finally
            {
                con.Close();
            }
        }
        #endregion


        #region Get Uniques Date  Data
        public List<MasterModel> GetUniqueDates(out bool status)
        {
            NpgsqlConnection con = Connect();
            DataTable table = new DataTable();
            List<MasterModel> master = new List<MasterModel>();

            try
            {
                DataSet dt = new DataSet();
                string Query = @$"select final.spgetuniquedates('ref1');FETCH ALL IN ""ref1"";";

                con.Open();
                NpgsqlDataAdapter adapter = new NpgsqlDataAdapter(Query, con);
                adapter.Fill(dt);

                table = dt.Tables[1];

                master = (from DataRow row in table.Rows

                          select new MasterModel
                          {
                              ID = 0,
                              Type = "",
                              Date = row["p_date"].ToString(),
                              Recieve = 0,
                              Issue = 0,
                              Pick = 0,
                              Touch = 0,
                              Loss = 0,
                              Fine = 0,
                              isdeleted = false,
                              CreatedOn = "",

                          }).ToList();

                status = true;
                return master;
            }
            catch (Exception ex)
            {
                status = false;
                return master;
            }
            finally
            {
                con.Close();
            }
        }
        #endregion
    }
}
