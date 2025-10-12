# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Building and Running
```powershell
# Install Ruby dependencies
bundle install

# Build and serve locally for development
bundle exec jekyll serve

# Build for production
bundle exec jekyll build

# Clean generated files
bundle exec jekyll clean
```

### Development Server
```powershell
# Serve with drafts and future posts
bundle exec jekyll serve --drafts --future

# Serve with incremental builds for faster development
bundle exec jekyll serve --incremental

# Serve on specific port
bundle exec jekyll serve --port 4001
```

### Content Updates
```powershell
# Edit personal data (main content source)
# File: _data/data.yml

# Update site configuration
# File: _config.yml

# Modify styling
# Files: _sass/_base.scss, _sass/_mixins.scss, _sass/_print.scss
```

## Architecture Overview

### Data-Driven Jekyll CV
This is a Jekyll-based personal CV/resume website with a data-driven architecture that supports bilingual content (English/Russian) and dark/light themes.

### Key Architectural Patterns

**Centralized Data Management:**
- All personal information stored in `_data/data.yml`
- Structured with separate English (`en`) and Russian (`ru`) sections
- Single source of truth for contact info, skills, experience, education

**Modular Component System:**
- Each CV section is an isolated HTML include: `bio.html`, `experience.html`, `hardskills.html`, `softskills.html`, `languages.html`, `education.html`, `contact.html`
- Main layout in `_layouts/default.html` with single page assembly in `index.html`
- Header component handles language switching and theme toggle

**Bilingual Content Architecture:**
- Dual language support with runtime switching via JavaScript
- Content structure: `data-lang="en"` and `data-lang="ru"` attributes
- Title translations via `data-en` and `data-ru` attributes
- Language preference persisted in localStorage

**Theme System:**
- CSS custom properties for theme variables
- JavaScript-controlled theme switching with localStorage persistence
- Theme attribute on `<html>` element: `data-theme="light|dark"`

### Content Structure
```
_data/data.yml          # All personal/professional data
_includes/              # Modular CV sections
  ├── bio.html          # Personal bio/summary
  ├── experience.html   # Work experience with detailed lists
  ├── hardskills.html   # Technical skills
  ├── softskills.html   # Soft skills
  ├── languages.html    # Language proficiencies
  ├── education.html    # Educational background
  ├── contact.html      # Contact information
  └── header.html       # Site header with controls
_layouts/default.html   # Base HTML structure
index.html             # Main page assembly
_sass/                 # Styling architecture
assets/javascript/     # Client-side functionality
```

### Data Schema
The `_data/data.yml` follows this structure:
- `name`: Full name (global)
- `contact`: All contact methods and links
- `en`/`ru`: Language-specific content blocks
  - `hardskills.skill[]`: Technical skills array
  - `softskills.skill[]`: Soft skills array  
  - `languages[].idiom`: Language proficiency entries
  - `education[].degree`: Educational entries with time/university
  - `bio`: Personal summary text
  - `experience[]`: Job entries with role/time/company/details-list

### Client-Side Features
- **LanguageSwitcher class**: Manages bilingual content display
- **Dark/Light theme toggle**: Persists user preference
- **Print-friendly styling**: Specialized print CSS
- **Feather icons integration**: Icon system via CDN

### Deployment Notes
- Configured for GitHub Pages deployment
- Uses Jekyll 3.5.2 with jekyll-minifier plugin
- CNAME file for custom domain support
- Excludes development files from build output

## Important Files to Modify

**For content updates:** Edit `_data/data.yml` - this drives all displayed information
**For styling changes:** Work with `_sass/` files, particularly `_base.scss`
**For functionality:** Modify JavaScript files in `assets/javascript/`
**For structure:** Update include files in `_includes/` directory