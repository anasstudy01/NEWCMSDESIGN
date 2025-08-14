// =============================================================================
// BARREL FILE USAGE EXAMPLE
// =============================================================================
// This demonstrates the before/after of using the centralized barrel file

/*
BEFORE: Multiple import statements (Verbose - 8+ lines)
─────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { Plus, Eye, Settings, CheckCircle } from 'lucide-react';
import { FaTwitter, FaFacebook } from 'react-icons/fa';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { sAPI } from '../../../services/api';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import type {  } from '../../../types';
*/

// AFTER: Single barrel import (Clean - 1 statement)
// ─────────────────────────────────────────────────────
import {
  // React hooks
  useState, useEffect,
  
  // Icons
  Plus, Eye, Settings, CheckCircle,
  FaTwitter, FaFacebook,
  
  // UI Components
  Card, Button, Input,
  
  // API Services
  sAPI, 
  
  // Form handling
  useFormik, Yup,
  
  // Types
  
} from './index';

/**
 * Example component demonstrating barrel file usage
 */
const BarrelExampleComponent: React.FC = () => {
  const [s, sets] = useState<[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data using imported API
  useEffect(() => {
    const fetchs = async () => {
      try {
        const data = await sAPI.gets();
        sets(data);
      } catch (error) {
        console.error('Error fetching s:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchs();
  }, []);

  // Form handling with imported Formik
  const formik = useFormik({
    initialValues: {
      Name: '',
      initialDeposit: 0,
    },
    validationSchema: Yup.object({
      Name: Yup.string().required(' name is required'),
      initialDeposit: Yup.number().min(100, 'Minimum deposit is $100'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  if (loading) {
    return (
      <Card>
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with icons */}
      <Card>
        <div className="flex items-center space-x-4 p-4">
          <Plus className="h-6 w-6 text-green-600" />
          <Eye className="h-6 w-6 text-blue-600" />
          <Settings className="h-6 w-6 text-gray-600" />
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        
        <h2 className="text-xl font-bold">
          Total s: {s.length}
        </h2>
      </Card>

      {/* Form example */}
      <Card title="Create New ">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Input
            label=" Name"
            name="Name"
            value={formik.values.Name}
            onChange={formik.handleChange}
            error={formik.errors.Name}
          />
          
          <Input
            label="Initial Deposit"
            type="number"
            name="initialDeposit"
            value={formik.values.initialDeposit}
            onChange={formik.handleChange}
            error={formik.errors.initialDeposit}
          />
          
          <Button type="submit">
            <Plus className="h-4 w-4 mr-2" />
            Create 
          </Button>
        </form>
      </Card>

      {/* Social media example */}
      <Card title="Social Media Links">
        <div className="flex space-x-4">
          <FaTwitter className="h-6 w-6 text-blue-500" />
          <FaFacebook className="h-6 w-6 text-blue-600" />
        </div>
      </Card>
    </div>
  );
};

export default BarrelExampleComponent;

// =============================================================================
// BENEFITS SUMMARY
// =============================================================================

/*
✅ BENEFITS ACHIEVED:

1. REDUCED IMPORT LINES:
   - Before: 10+ import statements
   - After: 1 comprehensive import

2. BETTER ORGANIZATION:
   - All imports grouped logically
   - Easy to see what's being used
   - Consistent import source

3. MAINTAINABILITY:
   - Single place to manage exports
   - Easy to add new exports
   - Centralized dependency management

4. DEVELOPER EXPERIENCE:
   - Faster development
   - Less repetitive typing
   - Better IDE autocomplete

5. BUNDLE OPTIMIZATION:
   - Tree-shaking still works
   - No performance penalty
   - Cleaner dependency graph
*/
