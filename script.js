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
            <input type="text" class="journal_article_title" required placeholder="My cool software">
        </div>
        <div>
            <label>DOI</label>
            <input type="text" class="doi" placeholder="https://doi.org/10000/10000">
        </div>
        <button type="button" class="btn btn-del">X</button>
    `;
    document.getElementById('publicationsContainer').appendChild(row);
}

function addReviewPublicationRow() {
    const row = document.createElement('div');
    row.className = 'publication-row';
    row.innerHTML = `
        <div>
            <label>Title *</label>
            <input type="text" class="journal_article_title" required placeholder="My cool software">
        </div>
        <div>
            <label>DOI</label>
            <input type="text" class="doi" placeholder="https://doi.org/10000/10000">
        </div>
        <button type="button" class="btn btn-del">X</button>
    `;
    document.getElementById('reviewPublicationsContainer').appendChild(row);
}

function addDatasetRow(datasetsContainer) {
    const row = document.createElement('div');
    row.className = 'dataset-row';
    row.innerHTML = `
        <div class="dataset-fields">
            <div>
                <label>Dataset name</label>
                <input type="text" class="dataset-name" placeholder="My cool dataset">
            </div>
            <div>
                <label>Dataset URL</label>
                <input type="url" class="dataset-url" placeholder="https://example.org/dataset">
            </div>
            <div>
                <label>Data used for</label>
                <select class="data-category">
                    <option value="training-data">Training</option>
                    <option value="testing-data">Testing</option>
                    <option value="validation-data">Validating</option>
                    <option value="evaluation-data">Evaluating</option>
                    <option value="unsure-data">I don't know</option>
                </select>
            </div>
            <div class="dataset-ethical-aspects">
                <label>Ethical, legal, and/or social aspects of this dataset</label>
                <input type="text" class="dataset-ethics" placeholder="Describe relevant considerations">
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
                <input type="text" class="ml-model-info-link" placeholder="My cool model">
            </div>
            <div>
                <label>Link to information about the model</label>
                <input type="text" class="ml-model-info-link" placeholder="https://example.org/model">
            </div>
            <div>
                <label>ML model category</label>
                <select class="ml-model-category">
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
        </div>
    `;

    const datasetsContainer = row.querySelector('.datasets-container');
    // addDatasetRow(datasetsContainer);
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

document.getElementById('addPublicationButton').addEventListener('click', addPublicationRow);
document.getElementById('publicationsContainer').addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;

    const removeButton = event.target.closest('.btn-del');
    if (removeButton) removeButton.closest('.publication-row').remove();
});

document.getElementById('addReviewPublicationButton').addEventListener('click', addReviewPublicationRow);
document.getElementById('reviewPublicationsContainer').addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;

    const removeButton = event.target.closest('.btn-del');
    if (removeButton) removeButton.closest('.publication-row').remove();
});

document.getElementById('generateSQLButton').addEventListener('click', generateSQL);
document.getElementById('submitViaWebPRButton').addEventListener('click', () => submitViaWebPR());
document.getElementById('submitViaGitHubAPIButton').addEventListener('click', () => submitViaGitHubAPI());

// addPersonRow();
// addPublicationRow();
// addReviewPublicationRow();
addMlmodelSection();


function sqlVal(v) {
    if (!v || !v.trim()) return 'NULL';
    return `'${v.trim().replace(/'/g, "''")}'`;
}

function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'resource';
}

function generateSQL() {
    const software_name = document.getElementById('software_name').value.trim();
    if (!software_name) { alert("Name is required."); return null; }

    const software_website_link = document.getElementById('software_website_link').value.trim();
    const d = document.getElementById('d').value.trim();
    const journal_article_title = document.getElementById('journal_article_title').value.trim();
    const journal_article_URI = document.getElementById('journal_article_URI').value.trim();
    const ml_model_info_link = document.getElementById('ml_model_info_link').value.trim();
    const ml_model_ethics = document.getElementById('ml_model_ethics').value.trim();
    const co2_emmissions_tonnes = document.getElementById('co2_emmissions_tonnes').value.trim();
    const dataset_name = document.getElementById('dataset_name').value.trim();
    const dataset_url = document.getElementById('dataset_url').value.trim();
    const dataset_ethics = document.getElementById('dataset_ethics').value.trim();

    // is accessible for free
    // const d = document.getElementById('d').value.trim();
    // ml model category
    // const d = document.getElementById('d').value.trim();
    

    // const datePrefix = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const fileName = `submissions/${datePrefix}-${slugify(name)}.sql`;
    document.getElementById('fileNamePreview').textContent = fileName;

    let lines = [
        `-- Migration generated on ${new Date().toISOString()}`,
        `BEGIN TRANSACTION;`,
        ``
    ];

    // 1. Category
    if (category) {
        lines.push(`INSERT OR IGNORE INTO categories (name) VALUES (${sqlVal(category)});`);
    }

    // 2. Resource (Upsert / Ignore duplicate URL)
    const catExpr = category ? `(SELECT id FROM categories WHERE name = ${sqlVal(category)})` : 'NULL';
    lines.push(
        `INSERT INTO resources (name, url, identifier, description, version, license_spdx, category_id)`,
        `VALUES (${sqlVal(name)}, ${sqlVal(url)}, ${sqlVal(identifier)}, ${sqlVal(description)}, ${sqlVal(version)}, ${sqlVal(license)}, ${catExpr})`,
        `ON CONFLICT(url) DO UPDATE SET name=excluded.name, description=excluded.description, version=excluded.version, license_spdx=excluded.license_spdx;`,
        ``
    );

    // 3. People & Roles (Subquery lookup avoids ID collisions across PRs)
    document.querySelectorAll('.person-row').forEach(row => {
        const given = row.querySelector('.p-given').value.trim();
        const family = row.querySelector('.p-family').value.trim();
        const role = row.querySelector('.p-role').value;
        const orcid = row.querySelector('.p-orcid').value.trim();

        if (given && family) {
            if (orcid) {
                lines.push(`INSERT OR IGNORE INTO people (given_name, family_name, orcid) VALUES (${sqlVal(given)}, ${sqlVal(family)}, ${sqlVal(orcid)});`);
                lines.push(`INSERT INTO resource_roles (resource_id, person_id, role_name) VALUES ((SELECT id FROM resources WHERE url = ${sqlVal(url)}), (SELECT id FROM people WHERE orcid = ${sqlVal(orcid)}), ${sqlVal(role)});`);
            } else {
                lines.push(`INSERT INTO people (given_name, family_name, orcid) SELECT ${sqlVal(given)}, ${sqlVal(family)}, NULL WHERE NOT EXISTS (SELECT 1 FROM people WHERE given_name = ${sqlVal(given)} AND family_name = ${sqlVal(family)});`);
                lines.push(`INSERT INTO resource_roles (resource_id, person_id, role_name) VALUES ((SELECT id FROM resources WHERE url = ${sqlVal(url)}), (SELECT id FROM people WHERE given_name = ${sqlVal(given)} AND family_name = ${sqlVal(family)} LIMIT 1), ${sqlVal(role)});`);
            }
        }
    });


// . Publication
    document.querySelectorAll('.publication-row').forEach(row => {
        const given = row.querySelector('.journal_article_title').value.trim();
        const orcid = row.querySelector('.doi').value.trim();

        if (given && family) {
            if (doi) {
                lines.push(`INSERT OR IGNORE INTO publications (title, doi) VALUES (${sqlVal(title)}, ${sqlVal(doi)});`);
            } else {
                lines.push(`INSERT INTO publications (title, doi) SELECT ${sqlVal(title)}, NULL WHERE NOT EXISTS (SELECT 1 FROM publications WHERE given_name = ${sqlVal(title)} );`);
            }
        }
    });

    // 4. Keywords
    const kws = [...new Set(document.getElementById('keywords').value.split(',').map(k => k.trim().toLowerCase()).filter(Boolean))];
    kws.forEach(kw => {
        lines.push(`INSERT OR IGNORE INTO keywords (term) VALUES (${sqlVal(kw)});`);
        lines.push(`INSERT OR IGNORE INTO resource_keywords (resource_id, keyword_id) VALUES ((SELECT id FROM resources WHERE url = ${sqlVal(url)}), (SELECT id FROM keywords WHERE term = ${sqlVal(kw)}));`);
    });

    lines.push(``, `COMMIT;`);
    const sqlText = lines.join('\n');
    document.getElementById('sqlOutput').textContent = sqlText;
    return { fileName, sqlText, name };
}