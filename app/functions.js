class Functions {
  DateTime(datee) {
    const currentDate = new Date(parseInt(datee));

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    // console.log(formattedDate);

    return formattedDate;
  }

  shortenText(text, size = 13) {
    return text.length <= size ? text : `${text.substring(0, size)}..`;
  }
}

export default Functions;
