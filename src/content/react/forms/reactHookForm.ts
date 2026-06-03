import type { TopicContent } from '../../types';

export const reactHookForm: TopicContent = {
  slug: 'react-hook-form',
  title: 'React Hook Form',
  description: 'Master React Hook Form — the industry-standard library for forms in React. Learn registration, validation with Zod, error handling, and the patterns used in enterprise applications.',
  applicableVersions: ['React 16+', 'React 18', 'React Hook Form 7.x'],
  lastReviewed: 'January 2025',
  quickUnderstanding: 'React Hook Form (RHF) is the best way to handle forms in React. It uses uncontrolled inputs under the hood (no re-render on every keystroke), integrates with schema validation libraries like Zod, and provides a simple API for registration, validation, and submission. It handles 95% of form use cases with minimal code.',
  whatIsIt: `React Hook Form provides a simple hook-based API for form management:

\`\`\`ts
const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
\`\`\`

**Core API:**
- \`register(name, options)\` — connects an input to RHF (returns ref, onChange, onBlur, name)
- \`handleSubmit(fn)\` — validates the form, then calls your submit function with the data
- \`formState.errors\` — validation errors for each field
- \`watch(name)\` — subscribe to a field\'s current value
- \`setValue(name, value)\` — programmatically set a field value
- \`reset(values)\` — reset the form (optionally with new default values)
- \`Controller\` — wrapper for controlled third-party inputs (Select, DatePicker, etc.)`,
  whyWeNeedIt: `Manual controlled forms re-render on every keystroke. For a form with 20 fields, typing one character re-renders the entire form. RHF solves this:

- **Performance** — uncontrolled inputs, renders only on submit/error
- **Less code** — no manual state management for each field
- **Built-in validation** — required, min, max, pattern, custom validators
- **Schema validation** — Zod/Yup integration for type-safe validation
- **TypeScript first** — fully typed form data and errors
- **DevTools** — React Hook Form DevTools for debugging`,
  realWorldUsage: `RHF is the standard for forms in enterprise React:

- Multi-step insurance claim submission forms
- Patient registration forms in healthcare
- Financial product application forms (mortgage, loan)
- User profile and settings forms
- Dynamic forms where fields appear based on other field values`,
  howItWorks: `RHF uses uncontrolled inputs — it attaches a ref to each input and reads values directly from the DOM when needed (on submit or validation trigger). This avoids the re-render-on-every-keystroke problem of controlled inputs.

**Validation triggers:**
- \`mode: 'onSubmit'\` (default) — validate only on submit
- \`mode: 'onChange'\` — validate on every change
- \`mode: 'onBlur'\` — validate when field loses focus
- \`mode: 'onTouched'\` — validate on blur, then on change after first blur

**Schema validation:**
Integrate with Zod via \`@hookform/resolvers/zod\`. Define your schema once, get TypeScript types and runtime validation for free.`,
  example: {
    title: 'React Hook Form with Zod Validation',
    description: 'Complete form with schema validation, error handling, and API submission.',
    code: [
      {
        label: 'RHF + Zod — Production Pattern',
        language: 'tsx',
        code: `import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define schema — single source of truth for validation and types
const claimSchema = z.object({
  policyNumber: z.string().regex(/^POL-\d{6}$/, 'Format: POL-123456'),
  claimType: z.enum(['medical', 'property', 'vehicle'], {
    errorMap: () => ({ message: 'Select a claim type' }),
  }),
  incidentDate: z.string().min(1, 'Incident date is required'),
  description: z.string().min(20, 'Describe the incident (min 20 characters)'),
  amount: z.number({ invalid_type_error: 'Enter a valid amount' }).positive('Amount must be positive'),
});

type ClaimFormData = z.infer<typeof claimSchema>; // TypeScript type from schema

export function NewClaimForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ClaimFormData>({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      policyNumber: '',
      claimType: undefined,
      incidentDate: '',
      description: '',
      amount: undefined,
    },
  });

  const onSubmit = async (data: ClaimFormData) => {
    try {
      await submitClaim(data);
      reset();
      onSuccess();
    } catch (err) {
      // Set server-side errors back to specific fields
      setError('policyNumber', { message: 'Policy not found or inactive' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="field">
        <label htmlFor="policyNumber">Policy Number</label>
        <input
          id="policyNumber"
          {...register('policyNumber')}
          placeholder="POL-123456"
          aria-invalid={!!errors.policyNumber}
        />
        {errors.policyNumber && (
          <p className="error" role="alert">{errors.policyNumber.message}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="claimType">Claim Type</label>
        <select id="claimType" {...register('claimType')}>
          <option value="">Select type</option>
          <option value="medical">Medical</option>
          <option value="property">Property Damage</option>
          <option value="vehicle">Vehicle</option>
        </select>
        {errors.claimType && <p className="error">{errors.claimType.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Claim'}
      </button>
    </form>
  );
}`,
      },
      {
        label: 'Controller for Third-Party Inputs',
        language: 'tsx',
        code: `import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker'; // example third-party component

// Controller wraps components that don't accept ref (third-party UI libraries)
function BookingForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<BookingData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="appointmentDate"
        control={control}
        rules={{ required: 'Select an appointment date' }}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            minDate={new Date()}
          />
        )}
      />
      {errors.appointmentDate && (
        <p className="error">{errors.appointmentDate.message}</p>
      )}
    </form>
  );
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'When should I use register vs Controller?',
      answer: 'Use register for native HTML inputs (input, select, textarea) — it attaches a ref directly. Use Controller for third-party components that do not expose a ref (custom Select, DatePicker, Slider, rich text editor). Controller provides a render prop with onChange, onBlur, and value that you pass to the third-party component.',
    },
    {
      question: 'How do I watch a field value to show/hide other fields?',
      answer: 'Use the watch function: const claimType = watch("claimType"). This subscribes to the field and returns its current value. Use it in JSX: {claimType === "property" && <AmountField />}. Note: watch causes a re-render on every change — for performance, use getValues() in event handlers when you do not need reactivity.',
    },
  ],
  productionIssues: [
    '**Bug: register spread on custom components** — {...register("field")} passes ref, which does not work on custom components. Use Controller for non-native inputs.',
    '**Bug: reset() not working after async data load** — reset() must be called after the data is available. Use useEffect: useEffect(() => { if (data) reset(data); }, [data, reset]).',
    '**Validation mode** — Default mode "onSubmit" means errors only show after the first submit attempt. For better UX, use mode: "onTouched" which validates on blur then on change.',
  ],
  bestPractices: [
    'Always use Zod (or Yup) for schema validation — single source of truth for types and validation',
    'Use mode: "onTouched" for better UX than the default "onSubmit" mode',
    'Use setError for server-side validation errors returned from the API',
    'Use reset() with defaultValues to pre-populate forms from API data',
    'Use useFormContext for multi-step forms or deeply nested form components',
    'Install React Hook Form DevTools in development for debugging',
  ],
  architectNote: `React Hook Form with Zod is the standard form solution for enterprise React in 2024. The combination gives you: type-safe form data (Zod infers TypeScript types from the schema), runtime validation, server error handling, and excellent performance. For multi-step forms, use useFormContext to share form state across step components without prop drilling. For very complex dynamic forms (field arrays, conditional schemas), RHF\'s useFieldArray handles arrays of fields cleanly.`,
  faqs: [
    {
      question: 'How do I handle dynamic field arrays?',
      answer: 'Use useFieldArray from RHF: const { fields, append, remove } = useFieldArray({ control, name: "items" }). This manages an array of form fields (e.g., multiple claimants, multiple line items) with add/remove functionality. Each field gets a stable id for the key prop.',
    },
    {
      question: 'How do I share form state across multiple components?',
      answer: 'Use FormProvider and useFormContext. Wrap your form in <FormProvider {...methods}> and access the form methods in any child component with useFormContext<FormData>(). This is essential for multi-step forms where each step is a separate component.',
    },
  ],
  keyTakeaways: [
    'RHF uses uncontrolled inputs — no re-render on every keystroke',
    'register() for native inputs, Controller for third-party components',
    'Zod + zodResolver for type-safe schema validation',
    'handleSubmit validates before calling your submit function',
    'reset() to clear or pre-populate the form',
    'setError() for server-side validation errors',
    'useFormContext for sharing form state across components',
  ],
  relatedTopics: ['react-controlled-components', 'react-state', 'react-hooks-usestate'],
};
