/**
 * Parul University COE - Global Certification Forum (GCF)
 * JavaScript Training Evaluation Project
 * Domain Scope: 1.0 to 5.0 Strict Implementations
 */

"use strict";

const studentRegistry = [];

document.getElementById("studentForm").onsubmit = function (event) {
    event.preventDefault();
    console.log("[Engine Execution]: Form captured, executing assessment routine.");
    
    try {
        const validatedRecord = validateAndExtractInput();
        if (validatedRecord !== null) {
            const processedEvaluation = calculatePerformance(validatedRecord);
            studentRegistry.push(processedEvaluation);
            updateMetricsDashboard();
            renderLedgerTable();
            document.getElementById("studentForm").reset();
        }
    } catch (runtimeError) {
        console.error("[Fatal Runtime Violation]: " + runtimeError.message);
    } finally {
        console.log("[Engine Cycle State]: Processing sequence finished clean.");
    }
};

function validateAndExtractInput() {
    const nameEl = document.getElementById("studentName");
    const streamEl = document.getElementById("subjectCategory");
    const theoryEl = document.getElementById("theoryScore");
    const practicalEl = document.getElementById("practicalScore");

    let isFormValid = true;

    const rawName = nameEl.value.trim();
    if (rawName === "" || !isNaN(rawName)) {
        document.getElementById("nameError").style.display = "block";
        isFormValid = false;
    } else {
        document.getElementById("nameError").style.display = "none";
    }

    const rawTheory = parseFloat(theoryEl.value);
    if (isNaN(rawTheory) || rawTheory < 0 || rawTheory > 100) {
        document.getElementById("theoryError").style.display = "block";
        isFormValid = false;
    } else {
        document.getElementById("theoryError").style.display = "none";
    }

    const rawPractical = parseFloat(practicalEl.value);
    if (isNaN(rawPractical) || rawPractical < 0 || rawPractical > 100) {
        document.getElementById("practicalError").style.display = "block";
        isFormValid = false;
    } else {
        document.getElementById("practicalError").style.display = "none";
    }

    if (!isFormValid) return null;

    return {
        name: rawName,
        stream: streamEl.value,
        theory: rawTheory,
        practical: rawPractical
    };
}

function calculatePerformance(record) {
    const weightedTheory = record.theory * 0.60;
    const weightedPractical = record.practical * 0.40;
    let dynamicAggregate = weightedTheory + weightedPractical;
    dynamicAggregate = Math.round(dynamicAggregate * 100) / 100;

    let derivedGrade = "F";
    
    switch (true) {
        case (dynamicAggregate >= 90.0):
            derivedGrade = "O (Outstanding)";
            break;
        case (dynamicAggregate >= 80.0 && dynamicAggregate < 90.0):
            derivedGrade = "A+ (Excellent)";
            break;
        case (dynamicAggregate >= 70.0 && dynamicAggregate < 80.0):
            derivedGrade = "A (Very Good)";
            break;
        case (dynamicAggregate >= 60.0 && dynamicAggregate < 70.0):
            derivedGrade = "B (Good)";
            break;
        case (dynamicAggregate >= 50.0 && dynamicAggregate < 60.0):
            derivedGrade = "P (Pass)";
            break;
        default:
            derivedGrade = "F (Fail)";
            break;
    }

    return {
        name: record.name,
        stream: record.stream,
        theory: record.theory,
        practical: record.practical,
        aggregate: dynamicAggregate,
        grade: derivedGrade,
        isPassed: dynamicAggregate >= 50.0
    };
}

function updateMetricsDashboard() {
    const totalRecords = studentRegistry.length;
    if (totalRecords === 0) return;

    let compoundScoreSum = 0;
    let passingUnitsCount = 0;

    for (let index = 0; index < studentRegistry.length; index++) {
        const student = studentRegistry[index];
        compoundScoreSum += student.aggregate;
        if (student.isPassed === true) {
            passingUnitsCount++;
        }
    }

    const calculatedClassAverage = compoundScoreSum / totalRecords;
    const calculatedPassRate = (passingUnitsCount / totalRecords) * 100;

    document.getElementById("totalStudents").textContent = totalRecords;
    document.getElementById("classAverage").textContent = calculatedClassAverage.toFixed(2);
    document.getElementById("passRate").textContent = calculatedPassRate.toFixed(1) + "%";
}

function renderLedgerTable() {
    const tbody = document.getElementById("ledgerBody");
    tbody.innerHTML = "";

    studentRegistry.forEach(function (student) {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.textContent = student.name;
        tr.appendChild(tdName);

        const tdStream = document.createElement("td");
        tdStream.textContent = student.stream;
        tr.appendChild(tdStream);

        const tdTheory = document.createElement("td");
        tdTheory.textContent = student.theory.toFixed(1);
        tr.appendChild(tdTheory);

        const tdPractical = document.createElement("td");
        tdPractical.textContent = student.practical.toFixed(1);
        tr.appendChild(tdPractical);

        const tdAgg = document.createElement("td");
        tdAgg.textContent = student.aggregate.toFixed(2);
        tr.appendChild(tdAgg);

        const tdGrade = document.createElement("td");
        tdGrade.textContent = student.grade;
        
        if (!student.isPassed) {
            tdGrade.setAttribute("style", "color: #dc2626; font-weight: bold;");
        } else {
            tdGrade.setAttribute("style", "color: #16a34a; font-weight: bold;");
        }
        tr.appendChild(tdGrade);

        tbody.appendChild(tr);
    });
}