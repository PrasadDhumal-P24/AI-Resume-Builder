const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

console.log('API Key Status:', API_KEY ? '✅ Key Loaded' : '❌ Key Missing in .env')

async function askAI(prompt) {
  if (!API_KEY) {
    throw new Error('API_KEY_MISSING')
  }

  // Google Gemini Official Model Path (gemini-3.6-flash)
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1000
        }
      })
    }
  )

  const data = await response.json()

  if (data.error) {
    console.error('Gemini API Error Detail:', data.error)
    throw new Error(data.error.message || 'API Call Failed')
  }

  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
    throw new Error('No valid response received from Gemini AI')
  }

  return data.candidates[0].content.parts[0].text
}

export async function enhanceSummary(summary, name) {
  return await askAI(
    `You are an elite executive resume writer. Rewrite the following professional summary for ${name || 'the candidate'}. 
Make it extremely compelling, action-driven, ATS-friendly, and concise (exactly 3 to 4 impactful sentences). 
Focus on high-value skills, leadership qualities, and measurable results.
DO NOT include any markdown, bold formatting, quotes, or conversational intro. Return ONLY the final summary text.

Summary: ${summary}`
  )
}

export async function enhanceExperience(experiences) {
  if (!experiences?.length) return experiences
  const valid = experiences.filter(e => e.company && e.description)
  if (!valid.length) return experiences

  const result = await askAI(
    `You are an expert HR Manager. Transform these work experience descriptions into high-impact, ATS-optimized accomplishment bullet points.
For EACH job entry:
- Start every bullet point with a strong action verb (e.g., Developed, Engineered, Optimized, Spearheaded).
- Quantify achievements where possible.
- Provide EXACTLY 3 bullet points per job starting with "• ".
- Separate distinct job entries with "---".
DO NOT add markdown headers or conversation. Return ONLY the bullet points separated by "---".

${valid.map((e, i) =>
      `Job ${i + 1}: ${e.role} at ${e.company}\nDescription: ${e.description}`
    ).join('\n\n')}`
  )

  const sections = result.split('---')
  return experiences.map((exp, i) => ({
    ...exp,
    description: sections[i]?.trim() || exp.description
  }))
}

export async function enhanceProjects(projects) {
  if (!projects?.length) return projects
  const valid = projects.filter(p => p.name && p.description)
  if (!valid.length) return projects

  const result = await askAI(
    `You are a Senior Software Architect and Technical Recruiter. Rewrite these project descriptions into highly technical, impressive resume bullet points.
For EACH project entry:
- Highlight key technology stacks, problem-solving skills, and architecture/performance results.
- Provide EXACTLY 3 bullet points per project starting with "• ".
- Separate distinct project entries with "---".
DO NOT add markdown text or headers. Return ONLY the bullet points separated by "---".

${valid.map((p, i) =>
      `Project ${i + 1}: ${p.name}\nTech Stack: ${p.techStack || 'N/A'}\nDescription: ${p.description}`
    ).join('\n\n')}`
  )

  const sections = result.split('---')
  return projects.map((proj, i) => ({
    ...proj,
    highlights: sections[i]?.trim() || proj.highlights
  }))
}

export async function enhanceSkills(skills) {
  if (!skills.technical && !skills.tools) return skills

  const result = await askAI(
    `Clean, professionalize, and format the following skills for an ATS system. Remove duplicates, fix capitalization (e.g., React.js, JavaScript, Python), and group them logically.

Technical Skills: ${skills.technical || ''}
Tools & Technologies: ${skills.tools || ''}
Soft Skills: ${skills.soft || ''}

CRITICAL: Return ONLY a raw JSON object with no markdown formatting, no backticks, and no code blocks.
Example valid JSON format:
{"technical":"React.js, Node.js, Python","tools":"Git, VS Code, Docker","soft":"Problem Solving, Team Leadership"}`
  )

  try {
    const clean = result.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    return { ...skills, ...parsed }
  } catch (e) {
    console.error('JSON parsing error in enhanceSkills:', e)
    return skills
  }
}