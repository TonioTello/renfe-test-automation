export default class CommonMethods{
    
    public static getCurrentDate(){
        const currentDate= new Date();
        const day = currentDate.getDay() ;
        const month = currentDate.getMonth() + 1; // Note: Month is zero-based
        const year = currentDate.getFullYear();

        return {day, month, year}
    }

}