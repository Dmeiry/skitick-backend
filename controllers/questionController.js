import Board from "../models/boardSchema.js";

const getSchemaByType = (type) => {
  switch (type) {
    case "multipleChoiceSingle":
      return "multipleChoiceSingle";
    case "multipleChoiceMultiple":
      return "multipleChoiceMultiple";
    case "matching":
      return "matching";
    case "fillInTheBlank":
      return "fillInTheBlank";
    case "trueFalse":
      return "trueFalse";
    case "arrangeWords":
      return "arrangeWords";
    default:
      throw new Error("Invalid question type");
  }
};

export const createQuestion = async (req, res) => {
  const { type, boardId, ...data } = req.body;
  const schemaType = getSchemaByType(type);

  try {
    // Find the board by ID
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Create the new question object
    const newQuestion = { type: schemaType, ...data };

    // Add the question to the board's questions array
    board.questions.push(newQuestion);
    await board.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a question by ID
export const updateQuestion = async (req, res) => {
  const { boardId, questionId } = req.params;
  const { type, ...data } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const question = board.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    Object.assign(question, data); // Update the question with new data
    await board.save();

    res.json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a question by ID
export const deleteQuestion = async (req, res) => {
  const { boardId, questionId } = req.params;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const question = board.questions.id(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    question.remove(); // Remove the question from the array
    await board.save();

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
