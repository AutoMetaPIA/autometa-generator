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
            <input type="text" class="journal_article_title" placeholder="Publication title">
        </div>
        <div>
            <label>DOI</label>
            <input type="text" class="journal_article_URI" placeholder="10.0000/example">
        </div>
        <div>
            <label>Publication type</label>
            <select class="drop-down-menu publication-type">
                <option id="publication_type" value="reference">Reference about the software</option>
                <option id="publication_type" value="review">Review of the software</option>
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
                <input type="text" class="dataset_name" placeholder="My cool dataset">
            </div>
            <div>
                <label>Dataset URL</label>
                <input type="url" class="dataset_url" placeholder="https://example.org/dataset">
            </div>
            <div>
                <label>Data used for</label>
                <select class="drop-down-menu data_category">
                    <option id="data_category" value="training-data">Training</option>
                    <option id="data_category" value="testing-data">Testing</option>
                    <option id="data_category" value="validation-data">Validating</option>
                    <option id="data_category" value="evaluation-data">Evaluating</option>
                    <option id="data_category" value="unsure-data">I don't know</option>
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
                <select class="drop-down-menu ml_model_category">
                    <option id="ml_model_category" value="">Select a category</option>
                    <option id="ml_model_category" value="active learning">Active learning</option>
                    <option id="ml_model_category" value="clustering">Clustering</option>
                    <option id="ml_model_category" value="large language model">Large Language Model (LLM)</option>
                    <option id="ml_model_category" value="classification">Classification</option>
                    <option id="ml_model_category" value="unsure">I don't know</option>
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

document.getElementById('fillExampleData').addEventListener('change', event => {
    const checkbox = event.currentTarget;
    if (!checkbox.checked) return;

    const hasExistingData = [...document.querySelectorAll(
        '#software_name, #software_website_link, #relatedPublicationsContainer input, #mlmodelsContainer input'
    )].some(input => input.value.trim()) ||
        document.getElementById('is_accessible_freely').checked;

    if (hasExistingData && !window.confirm('Replace the current form data with example data?')) {
        checkbox.checked = false;
        return;
    }

    document.getElementById('software_name').value = 'Example Knowledge Synthesis Software';
    document.getElementById('software_website_link').value = 'https://example.org/software';
    document.getElementById('is_accessible_freely').checked = true;

    const publicationsContainer = document.getElementById('relatedPublicationsContainer');
    publicationsContainer.replaceChildren();
    addPublicationRow();
    const publicationRow = publicationsContainer.querySelector('.publication-row');
    publicationRow.querySelector('.journal_article_title').value = 'Example software publication';
    publicationRow.querySelector('.journal_article_URI').value = '10.0000/example.1';

    const modelsContainer = document.getElementById('mlmodelsContainer');
    modelsContainer.replaceChildren();
    addMlmodelSection();
    const modelRow = modelsContainer.querySelector('.mlmodel-row');
    modelRow.querySelector('.ml_model_name').value = 'Example machine learning model';
    modelRow.querySelector('.ml_model_info_link').value = 'https://example.org/model';
    modelRow.querySelector('.ml_model_category').value = 'clustering';

    const datasetsContainer = modelRow.querySelector('.datasets-container');
    addDatasetRow(datasetsContainer);
    const datasetRow = datasetsContainer.querySelector('.dataset-row');
    datasetRow.querySelector('.dataset_name').value = 'Example training dataset';
    datasetRow.querySelector('.dataset_url').value = 'https://example.org/dataset';
    datasetRow.querySelector('.data_category').value = 'training-data';
    datasetRow.querySelector('.dataset_ethics').value = 'Synthetic example data; no personal information.';

    document.getElementById('jsonStatus').textContent = 'Example data loaded.';
});

// document.getElementById('addPersonButton').addEventListener('click', addPersonRow);
// document.getElementById('peopleContainer').addEventListener('click', event => {
//     if (!(event.target instanceof Element)) return;

//     const removeButton = event.target.closest('.btn-del');
//     if (removeButton) removeButton.closest('.person-row').remove();
// });

/////////////////////////////// Generate json

function clearForm() {
    document.getElementById('metaForm').reset();
    document.getElementById('relatedPublicationsContainer').replaceChildren();
    document.getElementById('mlmodelsContainer').replaceChildren();
    document.getElementById('jsonOutput').textContent =
        'Fill out the form and click "Preview JSON" to see the generated metadata.';
    document.getElementById('jsonStatus').textContent = 'Form cleared.';
}

document.querySelectorAll('.btn-clear-form').forEach(button => {
    button.addEventListener('click', clearForm);
});

document.getElementById('addRelatedPublicationButton').addEventListener('click', addPublicationRow);
document.getElementById('relatedPublicationsContainer').addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;

    const removeButton = event.target.closest('.btn-del');
    if (removeButton) removeButton.closest('.publication-row').remove();
});

document.getElementById('generateJSONButton').addEventListener('click', generateJSON);
document.getElementById('copyJSONButton').addEventListener('click', async () => {
    const generated = generateJSON();
    if (!generated) return;

    if (!navigator.clipboard?.writeText) {
        document.getElementById('jsonStatus').textContent =
            'Clipboard access is unavailable. Select the JSON above and copy it manually.';
        return;
    }

    try {
        await navigator.clipboard.writeText(generated.jsonText);
        document.getElementById('jsonStatus').textContent = 'JSON copied to the clipboard.';
    } catch (error) {
        const detail = error instanceof Error ? ` ${error.message}` : '';
        document.getElementById('jsonStatus').textContent = `Could not copy JSON.${detail}`;
    }
});
document.getElementById('downloadJSONButton').addEventListener('click', () => {
    const generated = generateJSON();
    if (!generated) return;

    const blob = new Blob([generated.jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = generated.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
    document.getElementById('jsonStatus').textContent = `Downloaded ${generated.fileName}.`;
});

function generateJSON() {
    const form = document.getElementById('metaForm');
    if (!form.reportValidity()) return null;

    const status = document.getElementById('jsonStatus');
    if (typeof window.crypto?.randomUUID !== 'function' && typeof window.crypto?.getRandomValues !== 'function') {
        status.textContent = 'Secure ID generation is unavailable in this browser.';
        return null;
    }
    const createId = () => {
        if (typeof window.crypto.randomUUID === 'function') return window.crypto.randomUUID();

        const bytes = window.crypto.getRandomValues(new Uint8Array(16));
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('');
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    };

    const softwareName = document.getElementById('software_name').value.trim();
    const softwareWebsite = document.getElementById('software_website_link').value.trim();
    const publicationRows = [...document.querySelectorAll('#relatedPublicationsContainer .publication-row')];
    const incompletePublicationRow = publicationRows.find(row =>
        !row.querySelector('.journal_article_title').value.trim() &&
        row.querySelector('.journal_article_URI').value.trim()
    );
    if (incompletePublicationRow) {
        alert('Enter a title for each publication that has other information.');
        incompletePublicationRow.querySelector('.journal_article_title').focus();
        return null;
    }

    const publicationData = publicationRows
        .map(row => ({
            title: row.querySelector('.journal_article_title').value.trim(),
            uri: row.querySelector('.journal_article_URI').value.trim(),
            type: row.querySelector('.publication-type').value
        }))
        .filter(publication => publication.title || publication.uri);

    const modelData = [];
    for (const row of document.querySelectorAll('#mlmodelsContainer .mlmodel-row')) {
        const name = row.querySelector('.ml_model_name').value.trim();
        const infoLink = row.querySelector('.ml_model_info_link').value.trim();
        const category = row.querySelector('.ml_model_category').value;
        const datasets = [];

        for (const datasetRow of row.querySelectorAll('.dataset-row')) {
            const datasetName = datasetRow.querySelector('.dataset_name').value.trim();
            const url = datasetRow.querySelector('.dataset_url').value.trim();
            const ethics = datasetRow.querySelector('.dataset_ethics').value.trim();
            if (!datasetName && !url && !ethics) continue;

            if (!datasetName) {
                alert('Enter a name for each dataset that has other information.');
                datasetRow.querySelector('.dataset_name').focus();
                return null;
            }

            datasets.push({
                name: datasetName,
                url,
                category: datasetRow.querySelector('.data_category').value,
                ethics
            });
        }

        const hasModelData = name || infoLink || category || datasets.length > 0;
        if (!hasModelData) continue;

        if (!name) {
            alert('Enter a name for each machine learning model that has data.');
            row.querySelector('.ml_model_name').focus();
            return null;
        }

        modelData.push({ id: createId(), name, infoLink, category, datasets });
    }
    const softwareId = createId();
    const optionalValue = value => value || null;

    const getUtcTimestamp = () => {
        return new Date()
        .toISOString()        // "2026-11-19T20:44:05.123Z"
        .slice(0, 19)         // "2026-11-19T20:44:05"
        .replace(/[T:]/g, '-'); // "2026-11-19-20-44-05"
        };
    const now = getUtcTimestamp();

    const slug = softwareName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'software';
    const fileName = `${slug}_${softwareId}.json`;

    const data = {
        generator_info: {
            generation_datetime: now,
            file_name: fileName,
        },
        software: {
            software_id: softwareId,
            software_name: softwareName,
            software_website_link: optionalValue(softwareWebsite),
            is_accessible_freely: document.getElementById('is_accessible_freely').checked ? 1 : 0
        },
        publications: publicationData.map(publication => ({
            publication_id: createId(),
            software_id: softwareId,
            journal_article_title: publication.title,
            journal_article_URI: optionalValue(publication.uri),
            publication_type: publication.type
        })),
        mlmodels: modelData.map(model => ({
            ml_model_id: model.id,
            software_id: softwareId,
            ml_model_name: model.name,
            ml_model_info_link: optionalValue(model.infoLink),
            ml_model_category: optionalValue(model.category)
        })),
        datasets: modelData.flatMap(model =>
            model.datasets.map(dataset => ({
                dataset_id: createId(),
                ml_model_id: model.id,
                dataset_name: dataset.name,
                dataset_url: optionalValue(dataset.url),
                data_category: dataset.category,
                dataset_ethics: optionalValue(dataset.ethics)
            }))
        )
    };

    // const fileName = `${slug}.json`;
    const jsonText = JSON.stringify(data, null, 2);
    document.getElementById('jsonOutput').textContent = jsonText;
    status.textContent = 'JSON generated.';
    return { fileName, jsonText };
}
