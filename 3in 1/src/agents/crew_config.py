from crewai import Agent, Task, Crew
from crewai_tools import SerperDevTool, ScrapeWebsiteTool
from langchain_openai import ChatOpenAI
from langchain_community.llms import LlamaCpp
import os

# Initialize LLM (using Llama 3.1 as primary, fallback to GPT-4)
llm = LlamaCpp(
    model_path="models/llama-3.1-8b-instruct.gguf",
    temperature=0.1,
    max_tokens=2000,
) if os.path.exists("models/llama-3.1-8b-instruct.gguf") else ChatOpenAI(
    model="gpt-4-turbo",
    temperature=0.1
)

# Define Agents
monitoring_agent = Agent(
    role="Network Monitoring Specialist",
    goal="Continuously monitor network telemetry and detect anomalies",
    backstory="Expert in telecom network monitoring with 15 years experience",
    llm=llm,
    tools=[SerperDevTool(), ScrapeWebsiteTool()],
    verbose=True
)

prediction_agent = Agent(
    role="Predictive Analytics Engineer",
    goal="Predict network faults using time-series analysis and ML models",
    backstory="PhD in predictive maintenance for critical infrastructure",
    llm=llm,
    verbose=True
)

root_cause_agent = Agent(
    role="Root Cause Analysis Expert",
    goal="Perform deep causal analysis of network incidents",
    backstory="Former telecom NOC director with expertise in RCA",
    llm=llm,
    tools=[ScrapeWebsiteTool()],
    verbose=True
)

remediation_agent = Agent(
    role="Automation Engineer",
    goal="Generate and execute remediation scripts for network issues",
    backstory="DevOps engineer specializing in network automation",
    llm=llm,
    verbose=True
)

security_agent = Agent(
    role="Cybersecurity Specialist",
    goal="Monitor for security threats and ensure compliance",
    backstory="CISSP certified with telecom security experience",
    llm=llm,
    verbose=True
)

reporting_agent = Agent(
    role="Technical Writer",
    goal="Generate incident reports and communicate with stakeholders",
    backstory="Technical communicator with NOC experience",
    llm=llm,
    verbose=True
)

# Create Crew
crew = Crew(
    agents=[monitoring_agent, prediction_agent, root_cause_agent,
            remediation_agent, security_agent, reporting_agent],
    verbose=True
)

def orchestrate_incident_response(incident_data: dict) -> dict:
    """Orchestrate agents for incident response"""
    task = Task(
        description=f"Analyze and resolve network incident: {incident_data}",
        agent=root_cause_agent,
        expected_output="Detailed root cause analysis and remediation plan"
    )

    result = crew.kickoff(inputs={"incident": incident_data})
    return {"analysis": result, "actions_taken": []}