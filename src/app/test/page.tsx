'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testCreateContract = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to create test contract');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const testGetContracts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/test');
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to fetch test contracts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contract Schema Test</h1>
      
      <div className="space-x-4 mb-4">
        <Button 
          onClick={testCreateContract}
          disabled={loading}
        >
          Create Test Contract
        </Button>
        <Button 
          onClick={testGetContracts}
          disabled={loading}
        >
          Get Recent Contracts
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 