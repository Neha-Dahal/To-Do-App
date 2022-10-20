const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodosSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todos", TodosSchema);
//or todosModel=mongoose.model("Todos",TodosSchema)
//module.exports=todosModel (model lai export garna paryo)
