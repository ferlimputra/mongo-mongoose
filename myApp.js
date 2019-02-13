/**********************************************
* 3. FCC Mongo & Mongoose Challenges
* ==================================
***********************************************/

const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "Failed to connect"));
db.once('open', () => {
  console.log("Connected to Mongo");
});

const PersonSchema = new Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", PersonSchema);
const john = new Person({
  name: "John",
  age: 25,
  favoriteFoods: ["Omelette du Fromage"]
});

const createAndSavePerson = (person, done) => {
  person.save((err, data) => {
    if (err) {
      done(err);
    }
    done(null, person);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const findPeopleByName = (name, done) => {
  Person.find({
    name: name
  }, (err, data) => {
    if (err) {
      return done(err);
    }
    return done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({
    favoriteFoods: [food]
  }, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (err, person) => {
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if (err) {
        done(err);
      }
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const updated = {
    age: ageToSet
  };
  const options = {
    new: true
  };
  
  Person.findOneAndUpdate({
    name: personName
  }, updated, options, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({
    name: nameToRemove
  }, (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const query = Person.find({
    favoriteFoods: "burrito"
  }).sort({
    name: "asc"
  }).limit(2).select({
    age: false
  });
  
  query.exec((err, data) => {
    console.log(data);
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

/** # Further Readings... #
/*  ======================= */
// If you are eager to learn and want to go deeper, You may look at :
// * Indexes ( very important for query efficiency ),
// * Pre/Post hooks,
// * Validation,
// * Schema Virtuals and  Model, Static, and Instance methods,
// * and much more in the [mongoose docs](http://mongoosejs.com/docs/)


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
