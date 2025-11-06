#!/usr/bin/env python3
"""
Script to crawl IPIP website and save content as text files
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import os
import time
import re

def clean_text(text):
    """Clean and format text content"""
    # Remove extra whitespace
    text = re.sub(r'\n\s*\n\s*\n', '\n\n', text)
    text = re.sub(r' +', ' ', text)
    return text.strip()

def get_all_links(base_url):
    """Extract all links from the main page"""
    response = requests.get(base_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    links = set()
    for a in soup.find_all('a', href=True):
        href = a['href']
        # Skip mailto and external links
        if href.startswith('mailto:') or href.startswith('http') and not href.startswith(base_url):
            continue
        # Convert relative URLs to absolute
        full_url = urljoin(base_url, href)
        # Only include links from the same domain
        if urlparse(full_url).netloc == urlparse(base_url).netloc:
            links.add(full_url)
    
    return sorted(links)

def sanitize_filename(url):
    """Create a safe filename from URL"""
    # Get the path part
    parsed = urlparse(url)
    path = parsed.path.strip('/')
    
    if not path or path == '':
        return 'index.txt'
    
    # Replace / with _ and remove .htm/.html extension
    filename = path.replace('/', '_')
    filename = re.sub(r'\.(htm|html)$', '', filename)
    return f"{filename}.txt"

def fetch_and_save_page(url, output_dir):
    """Fetch a page and save its content as text"""
    try:
        print(f"Fetching: {url}")
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style"]):
            script.decompose()
        
        # Get text content
        text = soup.get_text()
        text = clean_text(text)
        
        # Create metadata header
        metadata = f"""Source URL: {url}
Crawled Date: {time.strftime('%Y-%m-%d %H:%M:%S')}
{'='*80}

"""
        
        # Save to file
        filename = sanitize_filename(url)
        filepath = os.path.join(output_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(metadata)
            f.write(text)
        
        print(f"  Saved to: {filename}")
        return True
        
    except Exception as e:
        print(f"  Error fetching {url}: {e}")
        return False

def main():
    base_url = "https://ipip.ori.org/"
    output_dir = "/home/chris/selve/data/ipip-crawled"
    
    # Create output directory
    os.makedirs(output_dir, exist_ok=True)
    
    # Get all links
    print("Extracting links from main page...")
    links = get_all_links(base_url)
    print(f"Found {len(links)} unique links\n")
    
    # Fetch and save each page
    successful = 0
    failed = 0
    
    for i, link in enumerate(links, 1):
        print(f"[{i}/{len(links)}]", end=" ")
        if fetch_and_save_page(link, output_dir):
            successful += 1
        else:
            failed += 1
        
        # Be polite - wait between requests
        time.sleep(0.5)
    
    print(f"\n{'='*80}")
    print(f"Crawling complete!")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")
    print(f"Output directory: {output_dir}")

if __name__ == "__main__":
    main()
