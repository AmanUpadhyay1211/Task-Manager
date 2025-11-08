import { Link } from 'react-router-dom'
import { ArrowLeft, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import useTaskStore from '../store/taskStore'

const About = () => {
    const { theme, toggleTheme } = useTaskStore();
    const skills = [
        'React.js',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Express.js',
        'Tailwind CSS',
        'Framer Motion',
        'MongoDB',
        'PostgreSQL',
        'MySQL',
        'Drizzle ORM',
        'Mongoose',
        'Zustand',
        'JWT Authentication',
        'Docker',
        'CI/CD',
        'Web3.js',
        'Ethers.js',
        'Blockchain',
        'LLM Integration',
        'API Design',
        'Performance Optimization',
    ];
    return (
        <div className="about-page min-h-screen">
            <header className="header">
                <div className="container">
                    <Link to="/" className="back-btn">
                        <ArrowLeft size={20} />
                        Back to Tasks
                    </Link>
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>
            </header>

            <main className="main-content py-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="container mx-auto max-w-2xl px-4"
                >
                    <div className="about-card">
                        <div className="profile-section flex flex-col items-center text-center">
                            <div className="avatar mb-4 h-28 w-28 overflow-hidden rounded-full border-2">
                                <img
                                    src="https://avatars.githubusercontent.com/u/146929943?v=4"
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <h1 className="about-title">About Me</h1>
                        </div>

                        <div className="info-section mt-6 space-y-6">
                            <div className="info-item">
                                <h2 className="info-label">Name</h2>
                                <p className="info-value">Aman Upadhyay</p>
                            </div>

                            <div className="info-item">
                                <h2 className="info-label">Role</h2>
                                <p className="info-value">Software Engineer</p>
                            </div>

                            <div className="info-item">
                                <h2 className="info-label">Approach</h2>
                                <p className="info-text">
                                    I focus on practicality, time efficiency, and skill-based problem breakdown.
                                    Every problem gets categorized by level, time requirement, and difficulty
                                    before execution.
                                </p>
                            </div>

                            <div className="info-item">
                                <h2 className="info-label">Skills</h2>
                                <div className="skills flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="skill-tag"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="info-item">
                                <h2 className="info-label">About This Project</h2>
                                <p className="info-text">
                                    This Advanced Task Manager showcases modern React techniques using Zustand
                                    for lightweight state management, Framer Motion for animations, and a clean,
                                    minimal Tailwind interface. Built for performance, clarity, and scalability.
                                </p>
                            </div>

                            <div className="info-item">
                                <h2 className="info-label">Connect</h2>
                                <div className="social-links mt-2 flex flex-wrap gap-4">
                                    <a
                                        href="https://github.com/AmanUpadhyay1211"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link flex items-center gap-2"
                                    >
                                        <Github size={20} />
                                        <span>GitHub</span>
                                    </a>
                                    <a
                                        href="https://linkedin.com/in/allthingsaman"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link flex items-center gap-2"
                                    >
                                        <Linkedin size={20} />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a
                                        href="mailto:amanupadhyay1211@gmail.com"
                                        className="social-link flex items-center gap-2"
                                    >
                                        <Mail size={20} />
                                        <span>Email</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

export default About
