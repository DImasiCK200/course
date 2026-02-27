const mongoose = require("mongoose");

const func = () => {
  if (process.argv.length > 3) {
    if (process.argv.length < 5) {
      console.log("Must be name and number to add to phonebook");

      return;
    }
    newPerson(process.argv[3], process.argv[4]);

    return;
  }

  showPersons();
};

const newPerson = (name, number) => {
  const person = new Person({
    name: String(name),
    number: String(number),
  });

  person.save().then((res) => {
    console.log(`added ${res.name} with number ${res.number} to phonebook`);
    mongoose.connection.close();
  });
};

const showPersons = () => {
  Person.find({}).then((res) => {
    console.log("phonebook:");
    res.forEach((person) => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
};

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://zgfzgfzgaf_db_user:${password}@cluster0.q68px42.mongodb.net/personApp?appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

// const noteSchema = new mongoose.Schema({
//   content: String,
//   important: Boolean
// })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// const Note = mongoose.model('Note', noteSchema)

const Person = mongoose.model("Person", personSchema);

func();
// // const note = new Note({
// //   content: 'HTML is easy',
// //   important: true,
// // })

// // note.save().then(result => {
// //   console.log('note saved!')
// //   mongoose.connection.close()
// // })
// Note.find({ important: true }).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })
