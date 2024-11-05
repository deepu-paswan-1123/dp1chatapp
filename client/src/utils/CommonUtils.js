

// const FormatDate = (date) => {
//     const Hours=new Date(date).getHours();
//     const minutes=new Date(date).getMinutes();

//     return `${Hours < 10 ? '0'+ Hours : Hours}:${minutes < 10 ? '0' + minutes : minutes}`
// }




const FormatDate = (date) => {
    const Hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();

    // Determine AM or PM
    const ampm = Hours >= 12 ? 'PM' : 'AM';

    // Convert Hours to 12-hour format
    const formattedHours = Hours % 12 || 12; // Modulus gives remainder. If it's 0, change it to 12.

    return `${formattedHours < 10 ? '0' + formattedHours : formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
}


export default FormatDate;
