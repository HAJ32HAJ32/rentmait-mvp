'use client';

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, FileText, MessageSquare } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl font-bold mb-6">
              Understand Your Rental Rights in Minutes, Not Hours
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Upload your tenancy agreement and get instant, clear explanations of your rights and protections. No legal jargon, no expensive lawyers.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                Try For Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Interface Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ask About Your Rights</h2>
            <p className="text-gray-600">Upload your tenancy agreement and chat with our AI about your specific rental situation</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Problem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Rental agreements are filled with complex legal jargon and unclear clauses, leaving renters vulnerable to unfair treatment and financial loss.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <Shield className="w-8 h-8 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Unfair Treatment</h3>
              <p className="text-gray-600">Unexpected rent hikes, ignored repairs, and unclear responsibilities</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <FileText className="w-8 h-8 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Financial Loss</h3>
              <p className="text-gray-600">Hidden fees, wrongful deposit deductions, and unexpected costs</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <MessageSquare className="w-8 h-8 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Stress & Anxiety</h3>
              <p className="text-gray-600">Uncertainty about rights and protections in your home</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get clear, actionable insights about your rental agreement in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Upload Your Agreement</h3>
              <p className="text-gray-600">Simply drag and drop your tenancy agreement (PDF or DOC)</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-gray-600">Our AI reviews your contract and identifies key clauses and potential issues</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Clear Insights</h3>
              <p className="text-gray-600">Receive easy-to-understand explanations of your rights and protections</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Understand Your Rights?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't let complex legal language leave you in the dark. Get started with Rentmait today.
          </p>
          <Button size="lg" className="gap-2">
            Try For Free
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
