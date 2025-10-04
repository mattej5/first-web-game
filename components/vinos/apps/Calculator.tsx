"use client";

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }

    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      case '%': return a % b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleNegate = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const handlePercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  interface ButtonProps {
    value: string;
    onClick: () => void;
    className?: string;
    span?: boolean;
  }

  const Button = ({ value, onClick, className = '', span = false }: ButtonProps) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`h-16 rounded-lg font-semibold text-xl transition-all hover:scale-95 active:scale-90 select-none ${
        span ? 'col-span-2' : ''
      } ${className}`}
    >
      {value}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      {/* Display */}
      <div className="bg-gray-800 text-white rounded-lg p-6 mb-4 text-right">
        <div className="text-4xl font-light overflow-hidden text-ellipsis">
          {display}
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-2 flex-1">
        <Button value="C" onClick={handleClear} className="bg-gray-400 text-gray-900 hover:bg-gray-500" />
        <Button value="±" onClick={handleNegate} className="bg-gray-400 text-gray-900 hover:bg-gray-500" />
        <Button value="%" onClick={handlePercent} className="bg-gray-400 text-gray-900 hover:bg-gray-500" />
        <Button value="÷" onClick={() => handleOperation('÷')} className="bg-green-500 text-white hover:bg-green-600" />

        <Button value="7" onClick={() => handleNumber('7')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="8" onClick={() => handleNumber('8')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="9" onClick={() => handleNumber('9')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="×" onClick={() => handleOperation('×')} className="bg-green-500 text-white hover:bg-green-600" />

        <Button value="4" onClick={() => handleNumber('4')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="5" onClick={() => handleNumber('5')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="6" onClick={() => handleNumber('6')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="-" onClick={() => handleOperation('-')} className="bg-green-500 text-white hover:bg-green-600" />

        <Button value="1" onClick={() => handleNumber('1')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="2" onClick={() => handleNumber('2')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="3" onClick={() => handleNumber('3')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="+" onClick={() => handleOperation('+')} className="bg-green-500 text-white hover:bg-green-600" />

        <Button value="0" onClick={() => handleNumber('0')} className="bg-gray-300 text-gray-900 hover:bg-gray-400" span />
        <Button value="." onClick={handleDecimal} className="bg-gray-300 text-gray-900 hover:bg-gray-400" />
        <Button value="=" onClick={handleEquals} className="bg-green-600 text-white hover:bg-green-700" />
      </div>
    </div>
  );
}
