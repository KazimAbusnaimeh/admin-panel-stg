export function nameValidateError(rule, value, callback) {
  if (!value) {
    callback("");
  } else if (value.toString().length < 2) {
    callback(new Error("Name Is Not Valid"));
  } else {
    const nameParts = value.trim().split(" ");

    // Check if there are at least two name parts
    if (nameParts.length < 2) {
      callback(new Error("Please Enter Your Full Name"));
    } else if (
      nameParts.some(
        (part, index) => index !== nameParts.length - 1 && part.length < 2
      )
    ) {
      callback(new Error("Name Is Not Valid"));
    } else {
      callback();
    }
  }
}

export function inputName(name) {
  return name.replace(/[^a-z ^A-Z]/g, "").slice(0, 60);
}
