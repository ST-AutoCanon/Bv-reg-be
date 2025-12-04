const mongoose = require("mongoose");

const homologationRequestSchema = mongoose.Schema(
  {
    request_number: {
      type: String,
      required: true,
      unique: true,
    },
    clonedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomologationRequest",
      default: null
    },
    version: {
      type: Number,
      default: 0,
    },
    vehicle_type: {
      value: { type: String, required: true, enum: ["2-Wheeler", "3-Wheeler"] },
      label: { type: String, default: "Type of Vehicle" },
      order: { type: Number, default: 1 },
    },
    fuel_type: {
      value: { type: String, required: true },
      label: { type: String, default: "Fuel Type" },
      order: { type: Number, default: 2 },
    },
    certification_type: {
      value: { type: String, required: true },
      label: { type: String, default: "Type of Certification" },
      order: { type: Number, default: 3 },
    },
    vehicle_max_speed: {
      value: { type: String, required: true },
      label: { type: String, default: "Vehicle Max Speed" },
      order: { type: Number, default: 4 },
    },
    motor_nominal_power: {
      value: { type: String, required: true },
      label: { type: String, default: "Nominal  Power of Motor" },
      order: { type: Number, default: 5 },
    },
    motor_peak_power: {
      value: { type: String, required: true },
      label: { type: String, default: "Peek power of motor" },
      order: { type: Number, default: 6 },
    },
    vehicle_length: {
      value: { type: String, required: true },
      label: { type: String, default: "Length" },
      order: { type: Number, default: 7 },
    },
    vehicle_width: {
      value: { type: String, required: true },
      label: { type: String, default: "Width" },
      order: { type: Number, default: 8 },
    },
    vehicle_height: {
      value: { type: String, required: true },
      label: { type: String, default: "Height" },
      order: { type: Number, default: 9 },
    },
    vehicle_unloded_weight: {
      value: { type: String, required: true },
      label: { type: String, default: "Unloaded Weight (w/o Battery)" },
      order: { type: Number, default: 10 },
    },
    vehicle_category: {
      value: { type: String, required: true },
      label: { type: String, default: "Category" },
      order: { type: Number, default: 11 },
    },
    prefered_testing_agency: {
      value: { type: String, required: true },
      label: { type: String, default: "Prefered Testing Agency" },
      order: { type: Number, default: 12 },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
    },
  },
  { timestamps: true }
)


homologationRequestSchema.pre("validate", async function (next) {
  // console.log("inside homologationRequestSchema.pre method")
  const doc = this
  let reqnumberPrefix
  if (doc.isNew) {
    if (doc.vehicle_type.value === "2-Wheeler") {
      reqnumberPrefix = "2W"
      if(doc.vehicle_max_speed.value === "Less than  70 kmph" || doc.vehicle_max_speed.value === "Less than  25 kmph") {
        reqnumberPrefix = reqnumberPrefix +"L"
      } else {
        reqnumberPrefix = reqnumberPrefix+"H"
      }
    } else {
      reqnumberPrefix = "3W"
      if(doc.vehicle_category.value == "E Rickshaw" || doc.vehicle_category.value == "L5M") {
        reqnumberPrefix = reqnumberPrefix + "L5M"
      } else {
        reqnumberPrefix = reqnumberPrefix + "L5N"
      }
    }
    const currentYear = new Date().getFullYear()
    const count = await mongoose.model("HomologationRequest").estimatedDocumentCount()
    const requestNumber = count ? `${reqnumberPrefix}-${currentYear}-${count + 1}` : `${reqnumberPrefix}-${currentYear}-1`
    // console.log(`requestNumber: ${requestNumber}`)
    doc.request_number = requestNumber
  }
  next()
})

module.exports = mongoose.model("HomologationRequest",  homologationRequestSchema);
