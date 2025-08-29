from openai import OpenAI
import requests
import os
import sys
import time

# Add current directory to Python path to import config.py
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

# Import API key from config.py
from config import API_KEY

# Initialize the client with your API key
client = OpenAI(api_key=API_KEY)

def generate_logo_with_dalle():
    prompt = """
    Create a fun, whimsical logo for 'Kinder Brain Development' that includes:
    - A playful brain icon with smiling face or happy expression
    - Bright, cheerful colors: blues, yellows, greens, oranges
    - Child-friendly, educational style with a whimsical touch
    - Incorporate learning elements like books, pencils, or stars
    - Modern, clean design that works for early childhood education
    - Transparent background preferred
    - No text in the image, just the icon/logo mark
    - Should be appealing to parents and teachers of young children
    - Vector-style, scalable design for website and print use
    """
    
    try:
        print("Generating fun, whimsical logo variations with DALL-E...")
        
        # Generate 4 logos one by one (DALL-E 3 only allows n=1)
        for i in range(4):
            print(f"Generating logo variation {i+1}...")
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                n=1,  # DALL-E 3 only allows 1 image at a time
                size="1024x1024",
                quality="standard",
                response_format="url"
            )
            
            # Create directory for logos if it doesn't exist
            os.makedirs("generated-logos", exist_ok=True)
            
            # Download the generated image
            image_url = response.data[0].url
            img_response = requests.get(image_url)
            
            if img_response.status_code == 200:
                with open(f"generated-logos/kinder-brain-logo-{i+1}.png", "wb") as f:
                    f.write(img_response.content)
                print(f"✓ Downloaded logo variation {i+1}")
            else:
                print(f"✗ Failed to download image {i+1}")
            
            # Wait a moment between requests to avoid rate limiting
            if i < 3:
                time.sleep(2)
                
        print("\nLogo generation complete! Check the 'generated-logos' folder.")
        print("You can now choose your favorite logo and resize it for different uses.")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    generate_logo_with_dalle()