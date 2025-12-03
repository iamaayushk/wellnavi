const mongoose = require('mongoose');
const Symptom = require('../models/Symptom');
const Condition = require('../models/Condition');

const medicalDatabase = {
  getSymptoms: async () => {
    try {
      return await Symptom.find({});
    } catch (error) {
      throw new Error('Error fetching symptoms from the database');
    }
  },

  getConditions: async () => {
    try {
      return await Condition.find({});
    } catch (error) {
      throw new Error('Error fetching conditions from the database');
    }
  },

  findSymptomById: async (id) => {
    try {
      return await Symptom.findById(id);
    } catch (error) {
      throw new Error('Error fetching symptom by ID');
    }
  },

  findConditionById: async (id) => {
    try {
      return await Condition.findById(id);
    } catch (error) {
      throw new Error('Error fetching condition by ID');
    }
  },

  addSymptom: async (symptomData) => {
    try {
      const symptom = new Symptom(symptomData);
      return await symptom.save();
    } catch (error) {
      throw new Error('Error adding symptom to the database');
    }
  },

  addCondition: async (conditionData) => {
    try {
      const condition = new Condition(conditionData);
      return await condition.save();
    } catch (error) {
      throw new Error('Error adding condition to the database');
    }
  }
};

module.exports = medicalDatabase;