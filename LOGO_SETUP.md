# How to Add Your Logo

This guide explains how to replace the sparkles icon in the Hero section with your company logo.

## Quick Steps

### 1. Prepare Your Logo

Recommended logo specifications:
- **Format**: PNG with transparent background (or SVG)
- **Size**: 256x256 pixels or larger
- **File name**: `logo.png` or `logo.svg`

### 2. Add Logo to Project

Place your logo file in the `public/` directory:

```
project/
├── public/
│   └── logo.png    ← Your logo here
```

### 3. Update Hero Component

Open the file: `src/components/Hero.tsx`

Find this section (around line 15-17):

```tsx
{/* Logo/Icon Section - Replace Sparkles with your logo */}
<div className="flex justify-center mb-8">
  <Sparkles className="w-16 h-16 text-white" strokeWidth={1.5} />
</div>
```

Replace it with:

```tsx
{/* Logo Section */}
<div className="flex justify-center mb-8">
  <img
    src="/logo.png"
    alt="Beauty Center Logo"
    className="w-16 h-16 md:w-20 md:h-20 object-contain"
  />
</div>
```

### 4. Remove Unused Import (Optional)

At the top of `Hero.tsx`, you can remove the Sparkles import:

```tsx
// Remove this line:
import { Sparkles } from 'lucide-react';
```

Since it's no longer being used.

## Example: Different Logo Sizes

### Larger Logo
```tsx
<img
  src="/logo.png"
  alt="Beauty Center Logo"
  className="w-24 h-24 md:w-32 md:h-32 object-contain"
/>
```

### Circular Logo with Border
```tsx
<img
  src="/logo.png"
  alt="Beauty Center Logo"
  className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-full border-2 border-white shadow-lg"
/>
```

### Logo with Animation
```tsx
<img
  src="/logo.png"
  alt="Beauty Center Logo"
  className="w-16 h-16 md:w-20 md:h-20 object-contain animate-pulse"
/>
```

## Troubleshooting

### Logo Not Showing

1. **Check file path**: Make sure your logo is in the `public/` directory
2. **Verify file name**: The `src` path should match your filename exactly
3. **Restart dev server**: Stop and restart `npm run dev`
4. **Check browser console**: Look for 404 errors

### Logo Too Small/Large

Adjust the Tailwind classes:
- `w-16 h-16` = 64px × 64px
- `w-20 h-20` = 80px × 80px
- `w-24 h-24` = 96px × 96px
- `w-32 h-32` = 128px × 128px

### Logo Not Centered

Make sure the parent div has these classes:
```tsx
<div className="flex justify-center mb-8">
```

## Using SVG Logo

If you have an SVG logo, you can import it directly:

### Method 1: Public Directory (Recommended)

```tsx
<img
  src="/logo.svg"
  alt="Beauty Center Logo"
  className="w-16 h-16 md:w-20 md:h-20"
/>
```

### Method 2: Import as Component

1. Place SVG in `src/assets/logo.svg`
2. Update Hero.tsx:

```tsx
import Logo from '../assets/logo.svg?react';

// In the component:
<Logo className="w-16 h-16 text-white" />
```

## Need Help?

If you encounter issues:
1. Check that your logo file exists in the correct location
2. Verify the file extension matches (`.png`, `.svg`, etc.)
3. Make sure the dev server is running
4. Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

Your logo should now appear in the Hero section!
