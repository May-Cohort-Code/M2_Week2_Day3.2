
let student = {
    name:"Kiruba",
    city: "Berlin",
    bootcamp:"Web Dev",
    profession:"Teaching"

}

/* console.log(student.name)
console.log(student.city)
console.log(student.bootcamp)
console.log(student.profession)
 */

//object destructuring
const {name:fullname,bootcamp, profession} = student

console.log(`Full Name`,fullname)
console.log(bootcamp)
console.log(profession)

console.log(student)


const person = {
    name: 'Ironhacker',
    age: 25,
    favoriteMusic: 'Metal',
    address: {
      street: 'Super Cool St',
      number: 123,
      city: 'Miami',
    },
  };
   
  const {street,number} = person.address
console.log(street)
console.log(number)


const data = {
    name: {
      firstName: 'ana',
      lastName: 'marino',
    },
    isStudent: true,
    favoriteFootballTeam: 'fc barcelona',
    hometown: {
      city: 'buenos aires',
      country: 'argentina',
    },
  };
  
  const {city,country} = data.hometown

  let myCities = ['london','berlin','LA']

  const [,,london,mexicoCity="Mexico City"] = myCities

  console.log(london)
  console.log(city)
  console.log(country)
  console.log(mexicoCity)
