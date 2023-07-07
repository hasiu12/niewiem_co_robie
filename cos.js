const bcrypt = require('bcrypt');

async function generateBcryptPassword(password) {
  try {
    const saltRounds = 10; // Koszt (liczba rund) hashowania hasła
    const salt = await bcrypt.genSalt(saltRounds); // Generowanie soli
    const hashedPassword = await bcrypt.hash(password, salt); // Haszowanie hasła
    console.log('Hashed password:', hashedPassword);
  } catch (error) {
    console.error('Error generating bcrypt password:', error);
  }
}

// Przykładowe użycie z podaniem hasła jako argumentu
const providedPassword = process.argv[2]; // Pobranie hasła z argumentu wywołania skryptu
generateBcryptPassword(providedPassword);