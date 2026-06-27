/**
 * Advanced Student Assessment Analytics Engine
 * Architecture Pattern: Domain Event-Driven Functional State Mutator
 * Authorized: COE Global Certification Forum (GCF) Compliance Model
 */

"use strict";

// Object-Oriented Functional Encapsulation of Application State Management
const EngineState = {
    _dataFrameRegistry: [],
    _activeFilter: "ALL",
    _currentSortField: "aggregate",
    _sortDirectionAsc: false,

    // Proxy Engine Hooks for synchronizing LocalStorage States natively
    initializeState() {
        try {
            const analyticalCache = localStorage.getItem("GCF_CORE_STATE_METRICS");
            if (analyticalCache) {
                this._dataFrameRegistry = JSON.parse(analyticalCache);
            }
        } catch (storageError) {
            console.error("[Cache Decryption Exception Failed]: State reverted to volatile runtime arrays.");
            this._dataFrameRegistry = [];
        }
    },

    syncStateStore() {
        localStorage.setItem("GCF_CORE_STATE_METRICS", JSON.stringify(this._dataFrameRegistry));
    },

    commitRecord(processedInstance) {
        this._dataFrameRegistry.push(processedInstance);
        this.syncStateStore();
    },

    flushState() {
        this._dataFrameRegistry = [];
        this.syncStateStore();
    },

    getRegistry() {
        // Return analytical computation matrix cloned array slices to protect standard object references
        let resultSlice = [...this._dataFrameRegistry];

        // Apply programmatic functional filter chains based on structural rules
        if (this._activeFilter === "PASSED") {
            resultSlice = resultSlice.filter(row => row.isPassed);
        } else if (this._activeFilter === "FAILED") {
            resultSlice = resultSlice.filter(row => !row.isPassed);
        }

        // Apply modern complex sorting algorithms across dynamic matrix properties
        resultSlice.sort((objectA, objectB) => {
            let valA = objectA[this._currentSortField];
            let valB = objectB[this._currentSortField];

            // Localize string verification protocols to optimize parsing performance
            if (typeof valA === "string") {
                return this._sortDirectionAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
            }

            return this._sortDirectionAsc ? valA - valB : valB - valA;
        });

        return resultSlice;
    },

    getMetrics() {
        const total = this._dataFrameRegistry.length;
        if (total === 0) return { total: 0, average: 0, passRate: 0 };

        // Use functional array reduction parameters to calculate aggregates efficiently
        const summarySum = this._dataFrameRegistry.reduce((accumulator, item) => accumulator + item.aggregate, 0);
        const passedCount = this._dataFrameRegistry.filter(item => item.isPassed).length;

        return {
            total: total,
            average: Number((summarySum / total).toFixed(2)),
            passRate: Number(((passedCount / total) * 100).toFixed(1))
        };
    },

    setFilter(filterCriteria) { this._activeFilter = filterCriteria; },
    toggleSortingField(fieldKey) {
        if (this._currentSortField === fieldKey) {
            this._sortDirectionAsc = !this._sortDirectionAsc;
        } else {
            this._currentSortField = fieldKey;
            this._sortDirectionAsc = true;
        }
    }
};

// Application Main Initialization Framework
document.addEventListener("DOMContentLoaded", () => {
    EngineState.initializeState();
    registerSystemTelemetryClock();
    attachEventCoreInterceptors();
    evaluateDashboardUIRenderCycle();
});

/**
 * High-Fidelity UI Event Intersection Core Mapping Architecture
 */
function attachEventCoreInterceptors() {
    const dataIngestionForm = document.getElementById("ingestionForm");
    const purgeRegistryBtn = document.getElementById("purgeRegistryBtn");
    const filterTabsContainer = document.getElementById("filterTabs");
    const tableHeaderElements = document.querySelectorAll("#ledgerTable th.sortable");

    // Intercept submit signals with simulated asynchronous processing delays
    dataIngestionForm.onsubmit = async function (submitEvent) {
        submitEvent.preventDefault();
        
        const validatedEntity = runStrictIngestionValidation();
        if (!validatedEntity) return;

        // Toggle button animation states to represent background task activity
        toggleFormProcessingUI(true);

        // Simulate asynchronous verification latency using a native Promise block
        await new Promise(resolveEvent => setTimeout(resolveEvent, 650));

        // Evaluate inputs using functional scaling logic
        const finalCalculatedEvaluation = runAlgorithmicEvaluation(validatedEntity);
        
        // Update persistent state tracking layers
        EngineState.commitRecord(finalCalculatedEvaluation);
        
        // Refresh UI layers and reset interactive elements cleanly
        evaluateDashboardUIRenderCycle();
        dataIngestionForm.reset();
        toggleFormProcessingUI(false);
    };

    // Global clear button event listener
    purgeRegistryBtn.onclick = function () {
        if (confirm("Are you sure you want to flush all records from the analytics engine memory?")) {
            EngineState.flushState();
            evaluateDashboardUIRenderCycle();
        }
    };

    // Table data filtering tabs event processing routing logic
    filterTabsContainer.onclick = function (clickEvent) {
        const targetedTab = clickEvent.target.closest(".tab");
        if (!targetedTab) return;

        filterTabsContainer.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
        targetedTab.classList.add("active");

        EngineState.setFilter(targetedTab.dataset.filter);
        evaluateDashboardUIRenderCycle();
    };

    // Direct dynamic table column sorting control configuration mappings
    tableHeaderElements.forEach(headerColumn => {
        headerColumn.onclick = function () {
            const sortParameterField = headerColumn.dataset.sort;
            EngineState.toggleSortingField(sortParameterField);
            evaluateDashboardUIRenderCycle();
        };
    });
}

/**
 * Strict Input Data Frame Telemetry Validation Engine
 */
function runStrictIngestionValidation() {
    const nameEl = document.getElementById("studentName");
    const theoryEl = document.getElementById("theoryScore");
    const practicalEl = document.getElementById("practicalScore");

    let pipelineStatusFlag = true;

    // Pattern-matching regex suite to filter out purely numeric values
    const sanitizedName = nameEl.value.trim();
    const alphabeticStringPattern = /^[a-zA-Z\s]{3,50}$/;
    if (!alphabeticStringPattern.test(sanitizedName)) {
        displayFieldValidationState("nameError", true);
        pipelineStatusFlag = false;
    } else {
        displayFieldValidationState("nameError", false);
    }

    // Upper and lower metric boundary tracking constraints
    const theoryValue = parseFloat(theoryEl.value);
    if (isNaN(theoryValue) || theoryValue < 0.0 || theoryValue > 100.0) {
        displayFieldValidationState("theoryError", true);
        pipelineStatusFlag = false;
    } else {
        displayFieldValidationState("theoryError", false);
    }

    const practicalValue = parseFloat(practicalEl.value);
    if (isNaN(practicalValue) || practicalValue < 0.0 || practicalValue > 100.0) {
        displayFieldValidationState("practicalError", true);
        pipelineStatusFlag = false;
    } else {
        displayFieldValidationState("practicalError", false);
    }

    if (!pipelineStatusFlag) return null;

    return { name: sanitizedName, stream: document.getElementById("subjectStream").value, theory: theoryValue, practical: practicalValue };
}

/**
 * Algorithmic Performance Grading Calculation Model
 */
function runAlgorithmicEvaluation(dataPayload) {
    // Structural Weighting Formulation: Theory (60%), Practical (40%)
    const compoundAggregate = (dataPayload.theory * 0.60) + (dataPayload.practical * 0.40);
    const normalizedAggregate = Math.round(compoundAggregate * 100) / 100;

    let targetMatrixGrade;
    switch (true) {
        case (normalizedAggregate >= 90.0): targetMatrixGrade = "O (Outstanding)"; break;
        case (normalizedAggregate >= 80.0): targetMatrixGrade = "A+ (Excellent)"; break;
        case (normalizedAggregate >= 70.0): targetMatrixGrade = "A (Very Good)"; break;
        case (normalizedAggregate >= 60.0): targetMatrixGrade = "B (Good)"; break;
        case (normalizedAggregate >= 50.0): targetMatrixGrade = "P (Pass)"; break;
        default: targetMatrixGrade = "F (Fail)"; break;
    }

    return {
        ...dataPayload,
        aggregate: normalizedAggregate,
        grade: targetMatrixGrade,
        isPassed: normalizedAggregate >= 50.0,
        timestamp: new Date().toLocaleTimeString()
    };
}

/**
 * High-Performance Render Loop Operations Using Document Fragments
 */
function evaluateDashboardUIRenderCycle() {
    const historicalLedgerData = EngineState.getRegistry();
    const currentMetricsSummary = EngineState.getMetrics();

    // Render Metrics Block Content Elements
    document.getElementById("totalRecords").textContent = currentMetricsSummary.total;
    document.getElementById("classAverage").textContent = currentMetricsSummary.average.toFixed(2);
    document.getElementById("passRate").textContent = currentMetricsSummary.passRate.toFixed(1) + "%";

    // Dynamically adjust operational health alerts on telemetry dashboard panels
    const passMetricCard = document.getElementById("passMetricCard");
    if (currentMetricsSummary.passRate >= 75.0) passMetricCard.dataset.trend = "positive";
    else if (currentMetricsSummary.passRate >= 50.0) passMetricCard.dataset.trend = "neutral";
    else passMetricCard.dataset.trend = "negative";

    const tbody = document.getElementById("ledgerBody");
    const emptyStatePlaceholder = document.getElementById("emptyPlaceholder");
    
    // Purge active child nodes safely using standard text flushing workflows
    tbody.innerHTML = "";

    if (historicalLedgerData.length === 0) {
        emptyStatePlaceholder.style.display = "block";
        return;
    }
    emptyStatePlaceholder.style.display = "none";

    // Initialize low-overhead virtual layout fragments to mitigate render lag issues
    const processingLayoutFragment = document.createDocumentFragment();

    historicalLedgerData.forEach(entryFrame => {
        const rowStructure = document.createElement("tr");

        rowStructure.innerHTML = `
            <td style="font-weight: 600;">${entryFrame.name}</td>
            <td><code style="background: rgba(255,255,255,0.05); padding: 0.2rem 0.4rem; border-radius:4px;">${entryFrame.stream}</code></td>
            <td class="text-right">${entryFrame.theory.toFixed(1)}</td>
            <td class="text-right">${entryFrame.practical.toFixed(1)}</td>
            <td class="text-right" style="font-weight: 700; color: var(--brand-primary);">${entryFrame.aggregate.toFixed(2)}</td>
            <td class="text-center">
                <span class="badge ${entryFrame.isPassed ? 'badge-success' : 'badge-danger'}">
                    ${entryFrame.grade}
                </span>
            </td>
        `;
        processingLayoutFragment.appendChild(rowStructure);
    });

    // Commit the built framework fragment directly to the table body tree
    tbody.appendChild(processingLayoutFragment);
}

/**
 * Micro Utilities, Form Toggles, and Context Telemetry Elements
 */
function displayFieldValidationState(elementId, showValidationError) {
    document.getElementById(elementId).style.display = showValidationError ? "block" : "none";
}

function toggleFormProcessingUI(isProcessing) {
    const button = document.getElementById("submitBtn");
    const buttonText = button.querySelector(".btn-text");
    const loadingSpinner = button.querySelector(".spinner");

    if (isProcessing) {
        button.disabled = true;
        buttonText.textContent = "Analyzing Frames...";
        loadingSpinner.classList.remove("hidden");
    } else {
        button.disabled = false;
        buttonText.textContent = "Compute & Commit Record";
        loadingSpinner.classList.add("hidden");
    }
}

function registerSystemTelemetryClock() {
    const clockElement = document.getElementById("runtimeClock");
    setInterval(() => {
        const currentTime = new Date();
        clockElement.textContent = `Engine Core Active: ${currentTime.toLocaleTimeString()}`;
    }, 1000);
}