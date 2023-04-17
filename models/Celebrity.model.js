const { Schema, model } = require('mongoose');
 
const celebritySchema = new Schema (
  {
    name: {
      type: String,
      required: true
    },
    occupation: {
    type: String,
    required: true
  },
    catchPhrase: String,
  },
);

const Celebrity = model("celebrities", celebritySchema);

module.exports = Celebrity;
