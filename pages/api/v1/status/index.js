import query from 'infra/database.js';

async function status(request, response) {

    const consulta = await query();
    console.log(consulta);

    response.status(200).json({
        "query": consulta.rows[0].sum
    });
}

export default status;