/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ClipboardCopy, ArrowRightLeft, Trash2, CheckCircle2, ListChecks, BellRing } from 'lucide-react';
 
const COLUMNS = {
  checklist: {
    inbound: [
      "Balto Call ID",
      "VOIP Call ID",
      "Rep Name",
      "Start Time (UTC)",
      "End Time (UTC)",
      "Checklist - do you have a personal email address for future written communication?",
      "Checklist - hello. good [morning/afternoon]. this is [collector name] on a *recorded* line.",
      "Checklist - how are you feeling about your finances over the next few weeks?",
      "Checklist - if you have any questions or concerns, please contact our office at __________.",
      "Checklist - may i have your name and reference?",
      "Checklist - thank you for your payment. the confirmation number is ___________.",
      "Checklist - thank you, how are you today _____ ?",
      "Checklist - thank you. if needed do we have permission to call you back within the next seven days?",
      "Checklist - thank you. my name is _____. i am a *debt collector* with creditors bureau usa.",
      "Checklist - the balance due is ___. how would you like to take care of this balance today?",
      "Checklist - there is a processing fee to pay with a card, its free to pay with a check, how would you like to pay this today?",
      "Checklist - there is an account for ______ that was assigned to our office for collection.",
      "Checklist - this is an attempt to collect a debt and any information obtained will be used for that purpose.",
      "Checklist - this transaction will appear as c.b. usa on your bank statement.",
      "Checklist - to confirm, am i speaking with [first & last name]?",
      "Checklist - what is the *best number* to reach you by phone and *text*?",
      "Checklist - what is your current mailing address?",
      "Checklist - when would you be able to pay ?"
    ],
    outbound: [
      "Balto Call ID",
      "VOIP Call ID",
      "Rep Name",
      "Start Time (UTC)",
      "End Time (UTC)",
      "Checklist - am i speaking with [first & last name]?",
      "Checklist - can you please verify your current mailing address?",
      "Checklist - do you have a personal email address for future written communication?",
      "Checklist - hello. good [morning/afternoon]. this is [collector name] on a *recorded* line.",
      "Checklist - how are you feeling about your finances over the next few weeks?",
      "Checklist - i'm calling regarding an account for ______ that was assigned to our office for collection.",
      "Checklist - if you have any questions or concerns, please contact our office at __________.",
      "Checklist - is this the *best number* to reach you by phone and *text*?",
      "Checklist - may i please speak with [first name]?",
      "Checklist - thank you for your payment. the confirmation number is ___________.",
      "Checklist - thank you. if needed do we have permission to call you back within the next seven days?",
      "Checklist - thank you. my name is _____. i am a *debt collector* with creditors bureau usa.",
      "Checklist - the balance due is ___. how would you like to take care of this balance today?",
      "Checklist - there is a processing fee to pay with a card, its free to pay with a check, how would you like to pay this today?",
      "Checklist - this is an attempt to collect a debt and any information obtained will be used for that purpose.",
      "Checklist - this transaction will appear as c.b. usa on your bank statement.",
      "Checklist - when would you be able to pay ?"
    ]
  },
  notification: {
    inbound: [
      "Balto Call ID",
      "VOIP Call ID",
      "Rep Name",
      "Start Time (UTC)",
      "End Time (UTC)",
      "Notifications - \"...remove it from your credit\"",
      "Notifications - \"by law\"",
      "Notifications - \"call is going nowhere\"",
      "Notifications - \"can you make payments?\"",
      "Notifications - \"could i maybe\"",
      "Notifications - \"dialer\"",
      "Notifications - \"disconnect the call\"",
      "Notifications - \"don't lie\"",
      "Notifications - \"don't speak to me like that\"",
      "Notifications - \"e o b\"",
      "Notifications - \"grow up\"",
      "Notifications - \"i disagree\"",
      "Notifications - \"i just wanted\"",
      "Notifications - \"i was just saying\"",
      "Notifications - \"i was wondering\"",
      "Notifications - \"i'll notate your account\"",
      "Notifications - \"let me speak\"",
      "Notifications - \"pending in collections\"",
      "Notifications - \"pif\"",
      "Notifications - \"post date\"",
      "Notifications - \"sif\"",
      "Notifications - \"sorry to bug you\"",
      "Notifications - \"sorry to interrupt\"",
      "Notifications - \"stop calling\"",
      "Notifications - \"we can delete\"",
      "Notifications - \"we will call you back\"",
      "Notifications - \"you are wrong\"",
      "Notifications - \"you don't understand\"",
      "Notifications - \"you need to\""
    ],
    outbound: [
      "Balto Call ID",
      "VOIP Call ID",
      "Rep Name",
      "Start Time (UTC)",
      "End Time (UTC)",
      "Notifications - \"...remove it from your credit\"",
      "Notifications - \"by law\"",
      "Notifications - \"call is going nowhere\"",
      "Notifications - \"can you make payments?\"",
      "Notifications - \"could i maybe\"",
      "Notifications - \"dialer\"",
      "Notifications - \"disconnect the call\"",
      "Notifications - \"don't lie\"",
      "Notifications - \"don't speak to me like that\"",
      "Notifications - \"e o b\"",
      "Notifications - \"grow up\"",
      "Notifications - \"i disagree\"",
      "Notifications - \"i just wanted\"",
      "Notifications - \"i was just saying\"",
      "Notifications - \"i was wondering\"",
      "Notifications - \"i'll notate your account\"",
      "Notifications - \"let me speak\"",
      "Notifications - \"pending in collections\"",
      "Notifications - \"pif\"",
      "Notifications - \"post date\"",
      "Notifications - \"sif\"",
      "Notifications - \"sorry to bug you\"",
      "Notifications - \"sorry to interrupt\"",
      "Notifications - \"stop calling\"",
      "Notifications - \"we can delete\"",
      "Notifications - \"we will call you back\"",
      "Notifications - \"you are wrong\"",
      "Notifications - \"you don't understand\""
    ]
  }
};
 
export default function App() {
  const [activeTab, setActiveTab] = useState<'checklist' | 'notification'>('checklist'); // 'checklist' o 'notification'
  const [mode, setMode] = useState<'inbound' | 'outbound'>('inbound'); // 'inbound' o 'outbound'
 
  const [inputData, setInputData] = useState('');
  const [outputData, setOutputData] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{
    originalCols: number;
    keptCols: number;
    matchedCols: number;
    rows: number;
    modeName: string;
  } | null>(null);
 
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
   
    let str = dateString.trim();
   
    if (str.includes('T')) {
      const [datePart, timePart] = str.split('T');
      const [year, month, day] = datePart.split('-');
      const [hour, minute] = timePart.split(':');
      return `${parseInt(month, 10)}/${parseInt(day, 10)}/${year} ${hour}:${minute}`;
    }
 
    try {
      const date = new Date(str);
      if (isNaN(date.getTime())) return str;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${month}/${day}/${year} ${hours}:${minutes}`;
    } catch (e) {
      return str;
    }
  };
 
  const processData = () => {
    setError('');
    setStats(null);
    if (!inputData.trim()) {
      setError('Por favor, pega los datos de Balto primero.');
      return;
    }
 
    // Seleccionamos las columnas activas basadas en la pestaña y el modo actuales
    const activeColumns = COLUMNS[activeTab][mode];
 
    try {
      const lines = inputData.replace(/\r/g, '').split('\n');
     
      let headerRowIndex = -1;
      let rawHeaders: string[] = [];
      let headers: string[] = [];
 
      const normalizeCol = (str: string) => {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '');
      };
 
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (normalizeCol(line).includes('baltocallid')) {
          headerRowIndex = i;
          rawHeaders = line.split('\t');
          headers = rawHeaders.map(normalizeCol);
          break;
        }
      }
 
      if (headerRowIndex === -1) {
        setError('No se pudo encontrar la fila de encabezados. Asegúrate de copiar desde donde dice "Balto Call ID".');
        return;
      }
 
      const headerMap: Record<string, number[]> = {};
      headers.forEach((h, idx) => {
        if (!headerMap[h]) headerMap[h] = [];
        headerMap[h].push(idx);
      });
 
      let foundColumns = 0;
      activeColumns.forEach(col => {
        const norm = normalizeCol(col);
        if (headerMap[norm]) foundColumns++;
      });
 
      if (foundColumns === 0) {
        setError(`No se reconoció ninguna columna válida para ${activeTab.toUpperCase()} - ${mode.toUpperCase()}. Verifica que pegaste los datos correctos.`);
        return;
      }
 
      let outputLines: string[] = [];
     
      // Eliminamos la lógica que agregaba "IN/Out". Solo usamos las columnas activas tal cual.
      outputLines.push(activeColumns.join('\t'));
 
      let processedRows = 0;
      for (let i = headerRowIndex + 1; i < lines.length; i++) {
        const line = lines[i].trimEnd();
        if (!line) continue;
 
        const row = line.split('\t');
        if (row.length < 2 && !row[0]) continue;
 
        const outputRow = activeColumns.map(col => {
          const normCol = normalizeCol(col);
          const indices = headerMap[normCol];
          if (!indices || indices.length === 0) return "";
 
          let finalVal = "";
          for (let idx of indices) {
            if (row[idx] !== undefined && row[idx].trim() !== "") {
              finalVal = row[idx].trim();
              break;
            }
          }
 
          if (finalVal) {
            if (finalVal.startsWith('"') && finalVal.endsWith('"')) {
               finalVal = finalVal.substring(1, finalVal.length - 1);
            }
            if (col === "Start Time (UTC)" || col === "End Time (UTC)") {
              finalVal = formatDate(finalVal);
            }
          } else {
            // REGLA DE ORO: Si Balto dejó la celda en blanco, y es una columna de preguntas, rellenar con "0"
            if (col.toLowerCase().includes('checklist') || col.toLowerCase().includes('notification')) {
              finalVal = "0";
            }
          }
         
          return finalVal;
        });
       
        outputLines.push(outputRow.join('\t'));
        processedRows++;
      }
 
      setOutputData(outputLines.join('\n'));
      setIsCopied(false);
      setStats({
        originalCols: rawHeaders.length,
        keptCols: activeColumns.length,
        matchedCols: foundColumns,
        rows: processedRows,
        modeName: `${activeTab.toUpperCase()} (${mode})`
      });
    } catch (err) {
      setError('Ocurrió un error al procesar los datos. Verifica el formato pegado.');
      console.error(err);
    }
  };
 
  const copyToClipboard = () => {
    if (!outputData) return;
    try {
      const textArea = document.createElement("textarea");
      textArea.value = outputData;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      } else {
        setError('No se pudo copiar automáticamente. Por favor, selecciona el texto y presiona Ctrl+C.');
      }
    } catch (err) {
      console.error('Error al copiar: ', err);
      setError('No se pudo copiar automáticamente. Por favor, selecciona el texto y presiona Ctrl+C.');
    }
  };
 
  const clearData = () => {
    setInputData('');
    setOutputData('');
    setError('');
    setIsCopied(false);
    setStats(null);
  };
 
  const handleTabChange = (tab: 'checklist' | 'notification') => {
    setActiveTab(tab);
    setOutputData('');
    setStats(null);
  };
 
  const handleModeChange = (newMode: 'inbound' | 'outbound') => {
    setMode(newMode);
    setOutputData('');
    setStats(null);
  };
 
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-6">
       
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         
          {/* Main Navigation Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => handleTabChange('checklist')}
              className={`flex-1 py-4 text-center font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'checklist'
                  ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <ListChecks size={18} />
              CHECKLIST
            </button>
            <button
              onClick={() => handleTabChange('notification')}
              className={`flex-1 py-4 text-center font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'notification'
                  ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <BellRing size={18} />
              NOTIFICATION
            </button>
          </div>
 
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Procesando: <span className="text-indigo-600 capitalize">{activeTab}</span>
              </h1>
              <p className="text-gray-500 mt-1 text-sm">Extrae y fusiona columnas automáticamente.</p>
            </div>
           
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => handleModeChange('inbound')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'inbound' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Inbound
                </button>
                <button
                  onClick={() => handleModeChange('outbound')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'outbound' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Outbound
                </button>
              </div>
 
              <button
                onClick={clearData}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
                <span className="hidden sm:inline">Limpiar</span>
              </button>
            </div>
          </div>
        </div>
 
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
            {error}
          </div>
        )}
 
        {stats && (
          <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 flex items-center gap-2 font-medium">
            <CheckCircle2 size={20} className="text-green-600"/>
            <span>¡Éxito! Se procesaron {stats.rows} filas de <b>{stats.modeName}</b>. Extraimos {stats.keptCols} columnas.</span>
          </div>
        )}
 
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
         
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-700">1. Pega la data original aquí</h2>
            </div>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder={`Pega aquí el reporte de ${activeTab} - ${mode} (Ctrl+V)...`}
              className="flex-grow min-h-[400px] p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-transparent text-sm font-mono whitespace-pre"
            ></textarea>
          </div>
 
          <div className="flex lg:flex-col justify-center gap-4 py-4 lg:py-0">
            <button
              onClick={processData}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowRightLeft size={24} className="lg:rotate-0 rotate-90" />
              <span className="font-semibold lg:hidden">Procesar Data</span>
            </button>
          </div>
 
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
            <div className="bg-indigo-50 px-4 py-3 border-b border-indigo-100 flex justify-between items-center">
              <h2 className="font-semibold text-indigo-900">2. Resultado Formateado</h2>
              <button
                onClick={copyToClipboard}
                disabled={!outputData}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  !outputData
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : isCopied
                      ? 'bg-green-100 text-green-700'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isCopied ? <CheckCircle2 size={16} /> : <ClipboardCopy size={16} />}
                {isCopied ? '¡Copiado!' : 'Copiar Data'}
              </button>
            </div>
            <textarea
              readOnly
              value={outputData}
              placeholder="Los datos procesados aparecerán aquí..."
              className="flex-grow min-h-[400px] p-4 resize-none bg-gray-50 focus:outline-none text-sm font-mono whitespace-pre text-gray-700"
            ></textarea>
          </div>
 
        </div>
      </div>
    </div>
  );
}

