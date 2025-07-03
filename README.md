
# CosmiQ – Explore the Universe 🌌

A full-stack React + Express app showcasing NASA’s Astronomy Picture of the Day, DSCOVR EPIC imagery, Near-Earth Object data, and a searchable NASA Image Library—complete with a simple AI chat assistant.

---

## 🚀 Features

- **APOD**: Browse NASA’s Astronomy Picture of the Day, pick any date.
- **EPIC**: View daily Earth images from DSCOVR; select a date to fetch archived shots.
- **NeoWs**: See today’s Near-Earth Objects with size, speed, and hazard info.
- **Library**: Search and preview NASA’s media library (images).
- **Chatbot**: Ask questions about the current APOD image (powered by a Hugging-Face endpoint).
- **Responsive**: Works across desktop, tablet, and mobile.
- **Caching**: Backend caches APOD & EPIC for 10 minutes to reduce NASA API calls.

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, CSS Grid & Flexbox, Lottie animations
- **Backend**: Node.js, Express, Axios
- **APIs**: NASA APOD, EPIC, NeoWs, Images (no key), Hugging-Face Inference
- **Deployment**: Any Node-friendly host (e.g. Render, Railway, Heroku)

---

## 📥 Getting Started

### Prerequisites

- Node.js ≥ 18 & npm (or yarn)
- A free [NASA API key](https://api.nasa.gov)
- (Optional) A Hugging-Face Inference token for the chatbot

### Installation

```bash
# clone this repo
git clone https://github.com/SrushtiS02/cosmiqbysrushti.git
cd cosmiqbysrushti

# install backend & frontend deps
cd backend && npm install
cd ../frontend && npm install
