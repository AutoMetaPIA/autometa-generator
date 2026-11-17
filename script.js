function addPersonRow() {
    const row = document.createElement('div');
    row.className = 'person-row';
    row.innerHTML = `
        <div>
            <label>Given Name</label>
            <input type="text" class="p-given" placeholder="Grace">
        </div>
        <div>
            <label>Family Name</label>
            <input type="text" class="p-family" placeholder="Hopper">
        </div>
        <div>
            <label>Role</label>
            <select class="p-role">
                <option value="author">author</option>
                <option value="contributor">contributor</option>
                <option value="maintainer">maintainer</option>
            </select>
        </div>
        <div>
            <label>ORCID</label>
            <input type="text" class="p-orcid" placeholder="0000-0001-2345-6789">
        </div>
        <button type="button" class="btn btn-del">X</button>
    `;
    document.getElementById('peopleContainer').appendChild(row);

    // for index.html
            //     <!-- <div class="add-section">
            //     <label>Author</label>
            //     <div id="peopleContainer"></div>
            //     <button type="button" class="btn btn-sec" id="addPersonButton">+ Add Person</button>
            // </div> -->
}

function addPublicationRow() {
    const row = document.createElement('div');
    row.className = 'publication-row';
    row.innerHTML = `
        <div>
            <label>Title *</label>
            <input type="text" class="journal_article_title" required placeholder="Publication title">
        </div>
        <div>
            <label>DOI</label>
            <input type="text" class="journal_article_URI" placeholder="10.0000/example">
        </div>
        <div>
            <label>Publication type</label>
            <select class="publication-type">
                <option value="reference">Reference about the software</option>
                <option value="review">Review of the software</option>
            </select>
        </div>
        <button type="button" class="btn btn-del">X</button>
    `;
    document.getElementById('relatedPublicationsContainer').appendChild(row);
}

function addDatasetRow(datasetsContainer) {
    const row = document.createElement('div');
    row.className = 'dataset-row';
    row.innerHTML = `
        <div class="dataset-fields">
            <div>
                <label>Dataset name</label>
                <input type="text" class="dataset_name" required placeholder="My cool dataset">
            </div>
            <div>
                <label>Dataset URL</label>
                <input type="url" class="dataset_url" placeholder="https://example.org/dataset">
            </div>
            <div>
                <label>Data used for</label>
                <select class="data_category">
                    <option value="training-data">Training</option>
                    <option value="testing-data">Testing</option>
                    <option value="validation-data">Validating</option>
                    <option value="evaluation-data">Evaluating</option>
                    <option value="unsure-data">I don't know</option>
                </select>
            </div>
            <div class="dataset-ethical-aspects">
                <label>Ethical, legal, and/or social aspects of this dataset</label>
                <input type="text" class="dataset_ethics" placeholder="Describe relevant considerations">
            </div>
        </div>
        <div>
            <button type="button" class="btn btn-del remove-dataset-button">Remove dataset</button>
        </div>
    `;
    datasetsContainer.appendChild(row);
}

function addMlmodelSection() {
    const row = document.createElement('div');
    row.className = 'mlmodel-row';
    row.innerHTML = `
        <div class="mlmodel-form-grid">
            <div>
                <label>Name of the model</label>
                <input type="text" class="ml_model_name" placeholder="My cool model">
            </div>
            <div>
                <label>Link to information about the model</label>
                <input type="url" class="ml_model_info_link" placeholder="https://example.org/model">
            </div>
            <div>
                <label>ML model category</label>
                <select class="ml_model_category">
                    <option value="">Select a category</option>
                    <option value="author">author</option>
                    <option value="contributor">contributor</option>
                    <option value="maintainer">maintainer</option>
                </select>
            </div>
        </div>
        <div class="model-datasets">
            <label>Dataset(s) used by this model</label>
            <div class="datasets-container"></div>
            <div>
                <button type="button" class="btn btn-sec add-dataset-button">+ Add Dataset</button>
            </div>
        </div>
        <button type="button" class="btn btn-del remove-model-button">Remove ML model</button>
    `;

    document.getElementById('mlmodelsContainer').appendChild(row);
}

document.getElementById('addMlmodelButton').addEventListener('click', addMlmodelSection);
document.getElementById('mlmodelsContainer').addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;

    const addDatasetButton = event.target.closest('.add-dataset-button');
    if (addDatasetButton) {
        const modelRow = addDatasetButton.closest('.mlmodel-row');
        addDatasetRow(modelRow.querySelector('.datasets-container'));
        return;
    }

    const removeDatasetButton = event.target.closest('.remove-dataset-button');
    if (removeDatasetButton) {
        removeDatasetButton.closest('.dataset-row').remove();
        return;
    }

    const removeModelButton = event.target.closest('.remove-model-button');
    if (removeModelButton) removeModelButton.closest('.mlmodel-row').remove();
});

// document.getElementById('addPersonButton').addEventListener('click', addPersonRow);
// document.getElementById('peopleContainer').addEventListener('click', event => {
//     if (!(event.target instanceof Element)) return;

//     const removeButton = event.target.closest('.btn-del');
//     if (removeButton) removeButton.closest('.person-row').remove();
// });

document.getElementById('addRelatedPublicationButton').addEventListener('click', addPublicationRow);
document.getElementById('relatedPublicationsContainer').addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;

    const removeButton = event.target.closest('.btn-del');
    if (removeButton) removeButton.closest('.publication-row').remove();
});

document.getElementById('generateSQLButton').addEventListener('click', generateSQL);
document.getElementById('submitViaWebPRButton').addEventListener('click', () => submitViaWebPR());
document.getElementById('submitViaGitHubAPIButton').addEventListener('click', () => submitViaGitHubAPI());

// addPersonRow();
addPublicationRow();
addMlmodelSection();


function sqlVal(v) {
    if (v === null || v === undefined || !String(v).trim()) return 'NULL';
    return `'${String(v).trim().replace(/'/g, "''")}'`;
}

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'resource';
}

function generateSQL() {
    const form = document.getElementById('metaForm');
    if (!form.reportValidity()) return null;

    if (typeof window.crypto?.randomUUID !== 'function') {
        alert('Secure ID generation is unavailable. Open this site in a current browser over HTTPS or localhost.');
        return null;
    }

    const softwareName = document.getElementById('software_name').value.trim();
    const softwareWebsite = document.getElementById('software_website_link').value.trim();
    const isAccessibleFreely = document.getElementById('is_accessible_freely').checked ? 1 : 0;
    const softwareId = window.crypto.randomUUID();

    const publications = [...document.querySelectorAll('#relatedPublicationsContainer .publication-row')].map(row => ({
        id: window.crypto.randomUUID(),
        title: row.querySelector('.journal_article_title').value.trim(),
        uri: row.querySelector('.journal_article_URI').value.trim(),
        type: row.querySelector('.publication-type').value
    }));

    const models = [];
    for (const row of document.querySelectorAll('#mlmodelsContainer .mlmodel-row')) {
        const name = row.querySelector('.ml_model_name').value.trim();
        const infoLink = row.querySelector('.ml_model_info_link').value.trim();
        const category = row.querySelector('.ml_model_category').value;
        const datasets = [...row.querySelectorAll('.dataset-row')].map(datasetRow => ({
            id: window.crypto.randomUUID(),
            name: datasetRow.querySelector('.dataset_name').value.trim(),
            url: datasetRow.querySelector('.dataset_url').value.trim(),
            category: datasetRow.querySelector('.data_category').value,
            ethics: datasetRow.querySelector('.dataset_ethics').value.trim()
        }));

        const hasModelData = name || infoLink || category || datasets.length > 0;
        if (!hasModelData) continue;

        if (!name) {
            alert('Enter a name for each machine learning model that has data.');
            row.querySelector('.ml_model_name').focus();
            return null;
        }

        models.push({
            id: window.crypto.randomUUID(),
            name,
            infoLink,
            category,
            datasets
        });
    }

    const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileName = `submissions/${datePrefix}-${slugify(softwareName)}.sql`;
    document.getElementById('fileNamePreview').textContent = fileName;

    const lines = [
        `-- Migration generated on ${new Date().toISOString()}`,
        `PRAGMA foreign_keys = ON;`,
        `BEGIN TRANSACTION;`,
        ``,
        `INSERT INTO softwares (software_id, software_name, software_website_link, is_accessible_freely)`,
        `VALUES (${sqlVal(softwareId)}, ${sqlVal(softwareName)}, ${sqlVal(softwareWebsite)}, ${isAccessibleFreely});`
    ];

    publications.forEach(publication => {
        lines.push(
            ``,
            `INSERT INTO publications (publication_id, software_id, journal_article_title, journal_article_URI, publication_type)`,
            `VALUES (${sqlVal(publication.id)}, ${sqlVal(softwareId)}, ${sqlVal(publication.title)}, ${sqlVal(publication.uri)}, ${sqlVal(publication.type)});`
        );
    });

    models.forEach(model => {
        lines.push(
            ``,
            `INSERT INTO mlmodels (ml_model_id, software_id, ml_model_name, ml_model_info_link, ml_model_category)`,
            `VALUES (${sqlVal(model.id)}, ${sqlVal(softwareId)}, ${sqlVal(model.name)}, ${sqlVal(model.infoLink)}, ${sqlVal(model.category)});`
        );

        model.datasets.forEach(dataset => {
            lines.push(
                ``,
                `INSERT INTO datasets (dataset_id, ml_model_id, dataset_name, dataset_url, data_category, dataset_ethics)`,
                `VALUES (${sqlVal(dataset.id)}, ${sqlVal(model.id)}, ${sqlVal(dataset.name)}, ${sqlVal(dataset.url)}, ${sqlVal(dataset.category)}, ${sqlVal(dataset.ethics)});`
            );
        });
    });

    lines.push(``, `COMMIT;`);
    const sqlText = lines.join('\n');
    document.getElementById('sqlOutput').textContent = sqlText;
    return { fileName, sqlText, name: softwareName };
}