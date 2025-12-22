'use client';

import { useEffect, useRef } from 'react';

interface SummernoteEditorProps {
    value: string;
    onChange: (content: string) => void;
    height?: number;
    placeholder?: string;
}

export default function SummernoteEditor({
    value,
    onChange,
    height = 300,
    placeholder = 'Enter your content here...'
}: SummernoteEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const isInitialized = useRef(false);

    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined' || isInitialized.current) return;

        // Load jQuery and Summernote dynamically
        const loadEditor = async () => {
            try {
                // Import jQuery
                const $ = (await import('jquery')).default;
                (window as any).jQuery = $;
                (window as any).$ = $;

                // Import Summernote CSS
                await import('summernote/dist/summernote-lite.css');

                // Import Summernote JS
                await import('summernote/dist/summernote-lite.js');

                if (editorRef.current) {
                    const $editor = $(editorRef.current);

                    // Initialize Summernote
                    $editor.summernote({
                        height: height,
                        placeholder: placeholder,
                        toolbar: [
                            ['style', ['style']],
                            ['font', ['bold', 'italic', 'underline', 'clear']],
                            ['color', ['color']],
                            ['para', ['ul', 'ol', 'paragraph']],
                            ['table', ['table']],
                            ['insert', ['link']],
                            ['view', ['fullscreen', 'codeview', 'help']]
                        ],
                        callbacks: {
                            onChange: (contents: string) => {
                                onChange(contents);
                            }
                        }
                    });

                    // Set initial value
                    if (value) {
                        $editor.summernote('code', value);
                    }

                    isInitialized.current = true;
                }
            } catch (error) {
                console.error('Error loading Summernote:', error);
            }
        };

        loadEditor();

        // Cleanup
        return () => {
            if (editorRef.current && isInitialized.current) {
                try {
                    const $ = (window as any).jQuery;
                    if ($) {
                        $(editorRef.current).summernote('destroy');
                    }
                } catch (e) {
                    // Ignore cleanup errors
                }
            }
        };
    }, []);

    // Update editor content when value changes externally
    useEffect(() => {
        if (isInitialized.current && editorRef.current) {
            const $ = (window as any).jQuery;
            if ($) {
                const currentContent = $(editorRef.current).summernote('code');
                if (currentContent !== value) {
                    $(editorRef.current).summernote('code', value);
                }
            }
        }
    }, [value]);

    return (
        <div>
            <div ref={editorRef} />
            <style jsx global>{`
                .note-editor {
                    border: 1px solid var(--glass-border) !important;
                    border-radius: 8px !important;
                    background: var(--primary) !important;
                }
                .note-toolbar {
                    background: var(--primary-light) !important;
                    border-bottom: 1px solid var(--glass-border) !important;
                }
                .note-btn {
                    color: var(--text-primary) !important;
                    background: transparent !important;
                }
                .note-btn:hover {
                    background: var(--glass-hover) !important;
                }
                .note-editable {
                    background: var(--primary) !important;
                    color: var(--text-primary) !important;
                }
                .note-statusbar {
                    background: var(--primary-light) !important;
                    border-top: 1px solid var(--glass-border) !important;
                }
                .note-dropdown-menu {
                    background: var(--primary-light) !important;
                    border: 1px solid var(--glass-border) !important;
                }
                .note-dropdown-item {
                    color: var(--text-primary) !important;
                }
                .note-dropdown-item:hover {
                    background: var(--glass-hover) !important;
                }
            `}</style>
        </div>
    );
}
