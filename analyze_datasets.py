#!/usr/bin/env python3
"""
Comprehensive analysis of all psychological test datasets
Creates an inventory with details about each test
"""

import os
import pandas as pd
from pathlib import Path
from collections import defaultdict
import json

def analyze_directory(base_path):
    """Analyze all datasets and create comprehensive inventory"""
    
    results = []
    base_dir = Path(base_path)
    
    # Get all subdirectories
    subdirs = [d for d in base_dir.iterdir() if d.is_dir()]
    
    print(f"Found {len(subdirs)} test directories\n")
    print("=" * 100)
    
    for subdir in sorted(subdirs):
        test_info = {
            'name': subdir.name,
            'path': str(subdir),
            'files': [],
            'data_files': [],
            'codebook': None,
            'readme': None,
            'total_size': 0,
            'row_count': None,
            'column_count': None,
            'description': None
        }
        
        print(f"\n📊 {subdir.name}")
        print("-" * 100)
        
        # List all files
        files = list(subdir.glob('*'))
        test_info['files'] = [f.name for f in files]
        
        # Calculate total size
        for f in files:
            if f.is_file():
                test_info['total_size'] += f.stat().st_size
        
        # Look for codebook
        for f in files:
            if 'codebook' in f.name.lower() or 'readme' in f.name.lower():
                if f.suffix in ['.txt', '.md', '.pdf']:
                    if 'codebook' in f.name.lower():
                        test_info['codebook'] = f.name
                    else:
                        test_info['readme'] = f.name
                    
                    # Try to read first few lines
                    if f.suffix == '.txt':
                        try:
                            with open(f, 'r', encoding='utf-8', errors='ignore') as file:
                                preview = file.read(500)
                                test_info['description'] = preview.strip()
                        except:
                            pass
        
        # Find data files (csv, tsv, dat)
        data_files = [f for f in files if f.suffix.lower() in ['.csv', '.tsv', '.dat', '.txt'] 
                      and 'codebook' not in f.name.lower() and 'readme' not in f.name.lower()]
        
        test_info['data_files'] = [f.name for f in data_files]
        
        # Analyze main data file
        if data_files:
            main_data = data_files[0]  # Usually the largest or first one
            
            # Sort by size and pick largest
            data_files_sorted = sorted(data_files, key=lambda x: x.stat().st_size, reverse=True)
            main_data = data_files_sorted[0]
            
            print(f"  📁 Main data file: {main_data.name} ({main_data.stat().st_size / 1024 / 1024:.2f} MB)")
            
            try:
                # Try to read the data file
                delimiter = '\t' if main_data.suffix == '.tsv' else ','
                
                # Try reading first few rows
                df_sample = pd.read_csv(main_data, delimiter=delimiter, nrows=5, low_memory=False)
                test_info['column_count'] = len(df_sample.columns)
                print(f"  📋 Columns: {test_info['column_count']}")
                print(f"  🔤 Column names (first 10): {list(df_sample.columns[:10])}")
                
                # Try to count total rows (this might be slow for large files)
                try:
                    df_count = pd.read_csv(main_data, delimiter=delimiter, usecols=[0])
                    test_info['row_count'] = len(df_count)
                    print(f"  📈 Rows: {test_info['row_count']:,}")
                except:
                    print(f"  📈 Rows: (too large to count quickly)")
                
            except Exception as e:
                print(f"  ⚠️  Error reading data: {str(e)[:100]}")
        
        # Show codebook info
        if test_info['codebook']:
            print(f"  📖 Codebook: {test_info['codebook']}")
        
        if test_info['description']:
            desc_preview = test_info['description'][:200].replace('\n', ' ')
            print(f"  📝 Description: {desc_preview}...")
        
        print(f"  💾 Total size: {test_info['total_size'] / 1024 / 1024:.2f} MB")
        
        results.append(test_info)
    
    return results

def create_summary_report(results, output_file):
    """Create a comprehensive markdown report"""
    
    with open(output_file, 'w') as f:
        f.write("# SELVE Dataset Inventory\n\n")
        f.write(f"**Generated:** 2025-10-25\n\n")
        f.write(f"**Total Datasets:** {len(results)}\n\n")
        
        # Calculate totals
        total_size = sum(r['total_size'] for r in results)
        total_rows = sum(r['row_count'] for r in results if r['row_count'])
        
        f.write(f"**Total Data Size:** {total_size / 1024 / 1024 / 1024:.2f} GB\n")
        f.write(f"**Total Response Rows:** {total_rows:,}\n\n")
        
        f.write("---\n\n")
        f.write("## 📋 Dataset Summary Table\n\n")
        f.write("| Test Name | Rows | Columns | Size (MB) | Has Codebook |\n")
        f.write("|-----------|------|---------|-----------|-------------|\n")
        
        for r in sorted(results, key=lambda x: x['total_size'], reverse=True):
            rows = f"{r['row_count']:,}" if r['row_count'] else "?"
            cols = r['column_count'] or "?"
            size = f"{r['total_size'] / 1024 / 1024:.1f}"
            codebook = "✅" if r['codebook'] else "❌"
            f.write(f"| {r['name']} | {rows} | {cols} | {size} | {codebook} |\n")
        
        f.write("\n---\n\n")
        f.write("## 📖 Detailed Dataset Information\n\n")
        
        for r in sorted(results, key=lambda x: x['name']):
            f.write(f"### {r['name']}\n\n")
            f.write(f"**Location:** `{r['path']}`\n\n")
            
            if r['row_count']:
                f.write(f"**Responses:** {r['row_count']:,} rows\n\n")
            if r['column_count']:
                f.write(f"**Variables:** {r['column_count']} columns\n\n")
            
            f.write(f"**Size:** {r['total_size'] / 1024 / 1024:.2f} MB\n\n")
            
            if r['codebook']:
                f.write(f"**Codebook:** `{r['codebook']}`\n\n")
            
            if r['data_files']:
                f.write(f"**Data Files:**\n")
                for df in r['data_files']:
                    f.write(f"- `{df}`\n")
                f.write("\n")
            
            if r['description']:
                f.write(f"**Description:**\n```\n{r['description'][:500]}\n```\n\n")
            
            f.write("---\n\n")
    
    print(f"\n✅ Report saved to: {output_file}")

def main():
    base_path = "/home/chris/selve/data/openpsychometrics-rawdata"
    output_file = "/home/chris/selve/data/DATASET_INVENTORY.md"
    
    print("🔍 Analyzing all psychological test datasets...\n")
    results = analyze_directory(base_path)
    
    print("\n" + "=" * 100)
    print("\n📝 Creating comprehensive report...")
    create_summary_report(results, output_file)
    
    # Save JSON for programmatic access
    json_file = "/home/chris/selve/data/dataset_inventory.json"
    with open(json_file, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"✅ JSON data saved to: {json_file}")

if __name__ == "__main__":
    main()
