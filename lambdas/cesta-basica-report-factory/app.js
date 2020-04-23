const mongoose = require('mongoose')
const { Report } = require('./models')
const { uploadReport } = require('./s3')
const getFilter = require('./filter')
const dataFilter = require('./data')
const transform = require('./transform')

exports.handler = async (event) => {
  console.log(event, typeof event)
  const { entity, filters } = JSON.parse(event)
  let report;
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true , useUnifiedTopology: true })

    report = await Report.create({
      status: 1,
      details: `Relatório da entidade: ${entity}`
    })

    const parsedFilters = getFilter(entity, filters)
    const data = await dataFilter(entity, parsedFilters)

    if (data.length > 0) {
      const response = await uploadReport(entity, transform(data, entity))
      await Report.updateOne({ _id: report._id }, {
        status: 2,
        url: response.Location
      })
    } else {
      console.error(new Error(`Data from ${entity} report returned ${data.length} results. Filters: ${JSON.stringify(filters)}`))
      await Report.updateOne({ _id: report._id }, {
        status: 3,
        details: `Relatório não contém dados`
      })
    }

    return {
      statusCode: 200
    };
  } catch (error) {
    console.error(error)
    await Report.updateOne({_id: report._id}, {
      status: 3,
      details: `Ocorreu um erro na geração do arquivo: ${error.message}`
    })
    return {
      statusCode: 500
    }
  }
};
