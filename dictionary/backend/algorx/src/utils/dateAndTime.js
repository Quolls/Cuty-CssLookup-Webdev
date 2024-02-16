export function isEighteenYearsOld(birthdate) {
    let parts = birthdate.split('-');
    let year = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1; // Months are zero-based (0 = January, 1 = February, ...)
    let day = parseInt(parts[2], 10);
    var birthDate = new Date(year, month, day);
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();

    // Check if the person's birthday has already occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }