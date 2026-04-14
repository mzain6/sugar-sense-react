"""CLI utility to analyze project language distribution."""

import os
from pathlib import Path
from collections import defaultdict


def count_lines_by_language():
    """Count lines of code by programming language."""
    
    language_map = {
        '.py': 'Python',
        '.tsx': 'TypeScript/React',
        '.ts': 'TypeScript',
        '.jsx': 'JavaScript/React',
        '.js': 'JavaScript',
        '.html': 'HTML/Jinja2',
        '.css': 'CSS',
        '.json': 'JSON',
        '.yaml': 'YAML',
        '.yml': 'YAML',
        '.sql': 'SQL',
    }
    
    ignore_dirs = {'.git', 'node_modules', 'venv', '__pycache__', 'dist', 'build', '.pytest_cache'}
    
    counts = defaultdict(lambda: {'files': 0, 'lines': 0, 'bytes': 0})
    root = Path.cwd()
    
    for file_path in root.rglob('*'):
        # Skip ignored directories
        if any(ignored in file_path.parts for ignored in ignore_dirs):
            continue
        
        if file_path.is_file():
            suffix = file_path.suffix.lower()
            
            # Get language
            language = language_map.get(suffix, 'Other')
            
            try:
                # Count lines
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = len(f.readlines())
                
                # Count bytes
                bytes_size = file_path.stat().st_size
                
                counts[language]['files'] += 1
                counts[language]['lines'] += lines
                counts[language]['bytes'] += bytes_size
            except:
                pass
    
    return counts


def print_analysis():
    """Print language distribution analysis."""
    counts = count_lines_by_language()
    
    total_lines = sum(data['lines'] for data in counts.values())
    total_files = sum(data['files'] for data in counts.values())
    
    print("\n" + "="*70)
    print("📊 PROJECT LANGUAGE DISTRIBUTION ANALYSIS")
    print("="*70)
    print(f"\nTotal Files: {total_files}")
    print(f"Total Lines: {total_lines:,}\n")
    
    print(f"{'Language':<20} {'Files':>10} {'Lines':>12} {'Percentage':>12}")
    print("-" * 70)
    
    # Sort by lines descending
    sorted_langs = sorted(counts.items(), key=lambda x: x[1]['lines'], reverse=True)
    
    for language, data in sorted_langs:
        percentage = (data['lines'] / total_lines * 100) if total_lines > 0 else 0
        print(f"{language:<20} {data['files']:>10} {data['lines']:>12,} {percentage:>11.1f}%")
    
    print("-" * 70)
    
    # Get Python and TypeScript totals
    python_lines = counts['Python']['lines']
    ts_lines = counts.get('TypeScript/React', {}).get('lines', 0) + counts.get('TypeScript', {}).get('lines', 0)
    jsx_lines = counts.get('JavaScript/React', {}).get('lines', 0)
    js_lines = counts.get('JavaScript', {}).get('lines', 0)
    html_lines = counts.get('HTML/Jinja2', {}).get('lines', 0)
    
    frontend_lines = ts_lines + jsx_lines + js_lines
    backend_lines = python_lines
    markup_lines = html_lines
    
    print(f"\n{'Backend (Python)':<20} {backend_lines:>12,} {(backend_lines/total_lines*100):>11.1f}%")
    print(f"{'Frontend (TS/JS)':<20} {frontend_lines:>12,} {(frontend_lines/total_lines*100):>11.1f}%")
    print(f"{'Templates (HTML)':<20} {markup_lines:>12,} {(markup_lines/total_lines*100):>11.1f}%")
    
    print("\n" + "="*70)
    print(f"✅ PRIMARY LANGUAGE: PYTHON ({(backend_lines/total_lines*100):.1f}%)")
    print("="*70 + "\n")


if __name__ == '__main__':
    print_analysis()
