document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const formInputs = {
        title: document.getElementById('template-title'),
        subtitle: document.getElementById('template-subtitle'),
        location: document.getElementById('template-location'),
        content: document.getElementById('template-content'),
        boilerplate: document.getElementById('template-boilerplate'),
        contact: document.getElementById('template-contact')
    };

    const previewElements = {
        title: document.getElementById('preview-title'),
        subtitle: document.getElementById('preview-subtitle'),
        location: document.getElementById('preview-location'),
        content: document.getElementById('preview-content'),
        boilerplate: document.getElementById('preview-boilerplate'),
        contact: document.getElementById('preview-contact')
    };

    const copyBtn = document.getElementById('copy-template');
    const downloadBtn = document.getElementById('download-template');

    // Update preview in real-time
    function updatePreview() {
        // Update title
        previewElements.title.textContent = formInputs.title.value || 'Your Compelling Headline Goes Here';
        
        // Update subtitle
        const subtitleText = formInputs.subtitle.value || 'A brief, attention-grabbing subtitle that summarizes your announcement';
        previewElements.subtitle.textContent = subtitleText;
        previewElements.subtitle.style.display = subtitleText ? 'block' : 'none';
        
        // Update location
        previewElements.location.textContent = formInputs.location.value || '[City, State] — [Date] — ';
        
        // Update content (with paragraph formatting)
        const contentText = formInputs.content.value || 
            'Start with a strong lead paragraph that answers the 5 W\'s (Who, What, When, Where, Why). This is your chance to hook the reader and make them want to continue reading.\n\n' +
            'Include more details in the second paragraph. Add quotes from key stakeholders, statistics, or other relevant information that supports your announcement.\n\n' +
            'Conclude with a strong call-to-action. Tell readers what you want them to do next - visit your website, contact your media representative, or attend an event.';
        
        // Convert line breaks to paragraphs
        const paragraphs = contentText.split('\n\n').filter(p => p.trim() !== '');
        previewElements.content.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
        
        // Update boilerplate
        const boilerplateText = formInputs.boilerplate.value || 
            'About [Your Company]\n\n' +
            'Provide a brief company description that includes your mission, products/services, and any other relevant information that establishes credibility.';
        
        const [heading, ...boilerplateLines] = boilerplateText.split('\n\n');
        previewElements.boilerplate.innerHTML = `
            <h4>${heading || 'About [Your Company]'}</h4>
            ${boilerplateLines.map(p => `<p>${p}</p>`).join('')}
        `;
        
        // Update contact
        const contactText = formInputs.contact.value || 
            'Media Contact:\n' +
            '[Contact Name]\n' +
            '[Job Title]\n' +
            '[Company Name]\n' +
            '[Email Address]\n' +
            '[Phone Number]\n' +
            '[Website URL]';
        
        const [contactHeading, ...contactLines] = contactText.split('\n');
        previewElements.contact.innerHTML = `
            <h4>${contactHeading || 'Media Contact:'}</h4>
            <p>${contactLines.join('<br>')}</p>
        `;
    }

    // Add event listeners for real-time updates
    Object.values(formInputs).forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Copy to clipboard functionality
    copyBtn.addEventListener('click', function() {
        const templateContent = generateTemplateContent();
        
        navigator.clipboard.writeText(templateContent).then(() => {
            // Show success message
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyBtn.classList.add('btn-success');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.classList.remove('btn-success');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text:', err);
            alert('Failed to copy template. Please try again or use Ctrl+C to copy manually.');
        });
    });

    // Download as DOCX functionality
    downloadBtn.addEventListener('click', function() {
        const templateContent = generateTemplateContent();
        const blob = new Blob([templateContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = 'press-release-template.txt';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success message
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        downloadBtn.classList.add('btn-success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.classList.remove('btn-success');
        }, 2000);
    });

    // Generate the full template content as plain text
    function generateTemplateContent() {
        const title = formInputs.title.value || 'Your Compelling Headline Goes Here';
        const subtitle = formInputs.subtitle.value || 'A brief, attention-grabbing subtitle that summarizes your announcement';
        const location = formInputs.location.value || '[City, State] — [Date] — ';
        
        let content = formInputs.content.value || 
            'Start with a strong lead paragraph that answers the 5 W\'s (Who, What, When, Where, Why). This is your chance to hook the reader and make them want to continue reading.\n\n' +
            'Include more details in the second paragraph. Add quotes from key stakeholders, statistics, or other relevant information that supports your announcement.\n\n' +
            'Conclude with a strong call-to-action. Tell readers what you want them to do next - visit your website, contact your media representative, or attend an event.';
        
        // Format content with proper line breaks
        content = content.split('\n\n').map(para => para.trim()).join('\n\n');
        
        // Generate the full template
        return `FOR IMMEDIATE RELEASE

${title.toUpperCase()}
${subtitle}

${location}

${content}

###

${formInputs.boilerplate.value || 'About [Your Company]\n\nProvide a brief company description that includes your mission, products/services, and any other relevant information that establishes credibility.'}

${formInputs.contact.value || 'Media Contact:\n[Contact Name]\n[Job Title]\n[Company Name]\n[Email Address]\n[Phone Number]\n[Website URL]'}

###`;
    }

    // Initialize the preview
    updatePreview();
});
