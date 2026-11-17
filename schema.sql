PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS softwares (
    software_id TEXT PRIMARY KEY NOT NULL,
    software_name TEXT NOT NULL,
    software_website_link TEXT,
    is_accessible_freely INTEGER NOT NULL DEFAULT 0
        CHECK (is_accessible_freely IN (0, 1))
);

CREATE TABLE IF NOT EXISTS publications (
    publication_id TEXT PRIMARY KEY NOT NULL,
    software_id TEXT NOT NULL,
    journal_article_title TEXT NOT NULL,
    journal_article_URI TEXT,
    publication_type TEXT NOT NULL
        CHECK (publication_type IN ('reference', 'review')),
    FOREIGN KEY (software_id) REFERENCES softwares (software_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS mlmodels (
    ml_model_id TEXT PRIMARY KEY NOT NULL,
    software_id TEXT NOT NULL,
    ml_model_name TEXT NOT NULL,
    ml_model_info_link TEXT,
    ml_model_category TEXT,
    ml_model_ethics TEXT,
    co2_emmissions_tonnes REAL,
    FOREIGN KEY (software_id) REFERENCES softwares (software_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS datasets (
    dataset_id TEXT PRIMARY KEY NOT NULL,
    ml_model_id TEXT NOT NULL,
    dataset_name TEXT NOT NULL,
    dataset_url TEXT,
    data_category TEXT,
    dataset_ethics TEXT,
    FOREIGN KEY (ml_model_id) REFERENCES mlmodels (ml_model_id) ON DELETE CASCADE
);
