# wedding-planner Checklist

## Local model runner

Use the included Python script to run `muse-glimmer:latest` from VS Code against a local OpenAI-compatible server.

### Setup

1. Create a virtual environment:
   ```powershell
   py -m venv .venv
   ```
2. Activate it:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```
3. Install the Python dependency:
   ```powershell
   pip install -r requirements.txt
   ```
4. Create a `.env` file from [`.env.local.example`](./.env.local.example)
5. Make sure your local model server is running on `http://localhost:11434`

### Run in VS Code

1. Open this folder in VS Code
2. Press `F5`
3. Choose `Run muse-glimmer locally`

### Run from terminal

```powershell
python app.py
```

You can also pass a custom prompt:

```powershell
python app.py "Write a short poem about integration."
```
