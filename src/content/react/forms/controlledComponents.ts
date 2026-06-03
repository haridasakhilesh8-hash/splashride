import type { TopicContent } from '../../types';

export const reactControlledComponents: TopicContent = {
  slug: 'react-controlled-components',
  title: 'Controlled Components',
  description: 'Master controlled components — the React pattern where form inputs are driven by state. Learn form handling, validation, and the patterns senior engineers use in enterprise applications.',
  applicableVersions: ['React 16+', 'React 18', 'React 19'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'A controlled component is a form input whose value is controlled by React state. The state is the single source of truth. Every keystroke calls onChange, which updates state, which updates the input. This gives you complete control over the form data at all times.',
  whatIsIt: `A controlled component keeps its value in React state:

\`\`\`tsx
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />
\`\`\`

Contrast with an **uncontrolled component** where the DOM owns the value:
\`\`\`tsx
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} />
// read: inputRef.current.value
\`\`\`

**Controlled is the React way.** You always know the current value, you can validate on every change, you can reset/pre-fill programmatically, and the value is in sync with your app state.`,
  whyWeNeedIt: `Controlled components give you:

- **Real-time validation** — validate as the user types
- **Conditional rendering** — show/hide fields based on other field values
- **Pre-filling** — populate forms from API data
- **Programmatic reset** — clear the form after submission
- **Derived state** — compute dependent fields automatically
- **Testability** — test form behaviour by simulating state changes`,
  realWorldUsage: `In a claims submission form:

- Multi-step form where step 2 data depends on step 1 selections
- Real-time field validation (email format, phone number, date ranges)
- Auto-populate fields from a policy lookup
- Conditional fields (show "secondary claimant" section only if "joint claim" is checked)
- Calculate premium estimate as the user fills in coverage details`,
  howItWorks: `**The controlled input cycle:**

1. State holds the current value: \`const [value, setValue] = useState('')\`
2. Input renders with the state value: \`<input value={value} />\`
3. User types a character
4. onChange fires: \`onChange={e => setValue(e.target.value)}\`
5. State updates
6. React re-renders the input with the new value

This cycle means React always knows the exact current value. Without the onChange handler, the input becomes read-only (React controls the value but nothing updates it).`,
  example: {
    title: 'Controlled Forms in Production',
    description: 'Complete form with validation, conditional fields, and submission handling.',
    code: [
      {
        label: 'Controlled Form with Validation',
        language: 'tsx',
        code: `interface ClaimForm {
  policyNumber: string;
  claimType: 'medical' | 'property' | 'vehicle' | '';
  incidentDate: string;
  description: string;
  amount: string;
}

interface FormErrors {
  policyNumber?: string;
  claimType?: string;
  incidentDate?: string;
  description?: string;
  amount?: string;
}

export function NewClaimForm({ onSubmit }: { onSubmit: (data: ClaimForm) => Promise<void> }) {
  const [form, setForm] = useState<ClaimForm>({
    policyNumber: '',
    claimType: '',
    incidentDate: '',
    description: '',
    amount: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ClaimForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(prev => ({ ...prev, [field]: e.target.value }));
      // Clear error on change
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
    };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.policyNumber.match(/^POL-\d{6}$/)) errs.policyNumber = 'Format: POL-123456';
    if (!form.claimType) errs.claimType = 'Select a claim type';
    if (!form.incidentDate) errs.incidentDate = 'Incident date is required';
    if (form.description.length < 20) errs.description = 'Describe the incident (min 20 chars)';
    if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSubmit(form);
      setSubmitted(true);
    } catch (err) {
      setErrors({ policyNumber: 'Submission failed. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <SuccessMessage message="Claim submitted successfully" />;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        label="Policy Number"
        value={form.policyNumber}
        onChange={handleChange('policyNumber')}
        error={errors.policyNumber}
        placeholder="POL-123456"
      />
      <Select
        label="Claim Type"
        value={form.claimType}
        onChange={handleChange('claimType')}
        error={errors.claimType}
        options={[
          { value: 'medical',  label: 'Medical' },
          { value: 'property', label: 'Property Damage' },
          { value: 'vehicle',  label: 'Vehicle' },
        ]}
      />
      {/* Conditional field — only show amount for property/vehicle */}
      {['property', 'vehicle'].includes(form.claimType) && (
        <Input
          label="Estimated Amount (£)"
          type="number"
          value={form.amount}
          onChange={handleChange('amount')}
          error={errors.amount}
        />
      )}
      <Button
        label={submitting ? 'Submitting...' : 'Submit Claim'}
        loading={submitting}
        type="submit"
      />
    </form>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between controlled and uncontrolled components?',
      answer: 'Controlled: React state is the source of truth. The input value is always in sync with state. You get real-time access to the value and full control. Uncontrolled: the DOM is the source of truth. You read the value via a ref when needed (e.g., on submit). Controlled is recommended for most forms. Uncontrolled is useful for file inputs and integrating with non-React code.',
    },
    {
      question: 'Why does my input become read-only?',
      answer: 'If you pass a value prop without an onChange handler, React makes the input read-only (it controls the value but nothing updates it). Fix: always pair value with onChange. If you want an initial value that the user can then freely edit, use defaultValue instead of value.',
    },
  ],
  productionIssues: [
    '**Performance: Re-rendering on every keystroke** — Controlled inputs re-render the component on every character typed. For complex forms with many fields, this can cause lag. Fix: use React Hook Form which uses uncontrolled inputs under the hood for performance.',
    '**Bug: Forgetting onChange** — A value prop without onChange makes the input read-only. React will warn in development but it is easy to miss.',
    '**Bug: Object state mutation** — setForm({ ...form, field: value }) is correct. form.field = value does not trigger re-render.',
  ],
  bestPractices: [
    'Use a single state object for related form fields',
    'Clear field errors on change for better UX',
    'Validate on submit, not on every change (unless real-time feedback is needed)',
    'Use noValidate on the form to disable browser native validation — you control it',
    'For complex forms with many fields, use React Hook Form instead of manual controlled components',
    'Pre-populate forms with defaultValues from API data using useEffect',
  ],
  architectNote: `Controlled components are correct for simple forms (3–5 fields). For complex enterprise forms (10+ fields, multi-step, dynamic fields, complex validation), use React Hook Form. RHF uses uncontrolled inputs under the hood (no re-render on every keystroke) while providing a controlled-like API with full TypeScript support, schema validation (Zod/Yup), and excellent performance. The rule: start with controlled, switch to RHF when the form grows.`,
  faqs: [
    {
      question: 'How do I pre-fill a form from API data?',
      answer: 'Use useEffect to set state when the data arrives: useEffect(() => { if (data) setForm({ name: data.name, email: data.email }); }, [data]). With React Hook Form, use the reset() function: useEffect(() => { if (data) reset(data); }, [data, reset]).',
    },
    {
      question: 'How do I handle file inputs?',
      answer: 'File inputs cannot be controlled (you cannot set their value). Use an uncontrolled approach with a ref or React Hook Form\'s register(). Read the file from the input: e.target.files[0]. Store the File object in state for upload.',
    },
  ],
  keyTakeaways: [
    'Controlled inputs have value + onChange — React state is the source of truth',
    'Always pair value with onChange — value alone makes the input read-only',
    'Use a single state object for form fields, spread for updates',
    'For complex forms, use React Hook Form for better performance',
    'Validate on submit; clear errors on change for good UX',
  ],
  relatedTopics: ['react-hook-form', 'react-state', 'react-hooks-usestate'],
};
