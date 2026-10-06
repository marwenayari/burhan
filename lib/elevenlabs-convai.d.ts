import type { DetailedHTMLProps, HTMLAttributes } from 'react';

// Attributes of the <elevenlabs-convai> web component that Burhan uses.
// Booleans are passed as the strings "true" / "false", as the widget expects.
type ConvaiBoolean = 'true' | 'false';

interface ElevenLabsConvaiAttributes extends HTMLAttributes<HTMLElement> {
  'agent-id': string;
  'dynamic-variables'?: string;
  variant?: 'tiny' | 'compact' | 'full';
  placement?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
  'always-expanded'?: ConvaiBoolean;
  'default-expanded'?: ConvaiBoolean;
  dismissible?: ConvaiBoolean;
  transcript?: ConvaiBoolean;
  'text-input'?: ConvaiBoolean;
  'mic-muting'?: ConvaiBoolean;
  'avatar-orb-color-1'?: string;
  'avatar-orb-color-2'?: string;
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': DetailedHTMLProps<ElevenLabsConvaiAttributes, HTMLElement>;
    }
  }
}
