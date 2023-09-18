namespace PayPolish.Models
{
    public class MasterModel
    {
        public int ID { get; set; }
        public  string Date { get; set; }
        public float Recieve { get; set; }
        public float Issue { get; set; }
        public float Pick { get; set; }
        public float Touch { get; set; }
        public float Loss { get; set; }
        public float Fine { get; set; }
        public bool isdeleted { get; set; }
        public string CreatedOn { get; set; }
    }
}
