"use strict";

const { LogEntity } = require("../entities/LogEntity");

require("../entities/LogEntity");

exports.createLogIterator = async (
  { createLogPersistence },
  { type, message }
) => {
  try {
    //console.log(">>>", type, message);
    const newLog = new LogEntity(type, "", "", message);

    /*if (name == "") return { status: "500", message: "Provide a valid name" };
    if (surname == "")
      return { status: "500", message: "Provide a valid surname" };
    if (email == "") return { status: "500", message: "Provide a valid email" };
    if (birthdate == "")
      return { status: "500", message: "Provide a valid birthdate" };
*/
    var output = await createLogPersistence(newLog);

    return output;
  } catch (error) {
    throw error;
  }
};

exports.searchLogIterator = async (
  { searchLogPersistence },
  { type, query }
) => {
  try {
    const newLog = new LogEntity();
    newLog.message = query;
    newLog.type = type;

    /*if (name == "") return { status: "500", message: "Provide a valid name" };
    if (surname == "")
      return { status: "500", message: "Provide a valid surname" };
    if (email == "") return { status: "500", message: "Provide a valid email" };
    if (birthdate == "")
      return { status: "500", message: "Provide a valid birthdate" };
*/
    var output = await searchLogPersistence(newLog);

    return output;
  } catch (error) {
    throw error;
  }
};

/*
exports.updateUserIterator = async (
  { updateUserPersistence },
  { name, surname, email, birthdate }
) => {
  try {
    //TODO: Fazer aqui algum tipo de updateUserEntity

    var output = await updateUserPersistence(email, name, surname, birthdate);
    return output;
  } catch (error) {
    throw error;
  }
};

exports.updateEmailIterator = async (
  { updateEmailPersistence },
  { currentEmail, newEmail }
) => {
  try {
    var output = await updateEmailIterator(currentEmail, newEmail);
    return output;
  } catch (error) {
    throw error;
  }
};

exports.deleteUserIterator = async ({ deleteUserPersistence }, { email }) => {
  try {
    //TODO: Check if email is valid or not
    var output = await deleteUserPersistence(email);
    return output;
  } catch (error) {
    throw error;
  }
};

exports.getAllUsersIterator = async ({ getAllUsersPersistence }) => {
  try {
    var output = await getAllUsersPersistence();

    return output;
  } catch (error) {
    throw error;
  }
};

exports.getSingleUserIterator = async (
  { getSingleUserPersistence },
  { email }
) => {
  try {
    var output = await getSingleUserPersistence(email);
    return output;
  } catch (error) {
    throw error;
  }
};
*/
