"use client"

import { CheckCircle2, AlertCircle, Leaf, Zap, Shield, Stethoscope, Clock, Info } from "lucide-react"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"
import { cn } from "@/lib/utils"

interface DiagnosisOutputProps {
  diagnosis: string
  language: Language
}

interface DiagnosisSection {
  id: string
  title: string
  content: string[]
  type: 'issue' | 'severity' | 'prevention' | 'treatment' | 'recovery' | 'default'
}

export default function DiagnosisOutput({ diagnosis, language }: DiagnosisOutputProps) {
  const t = translations[language]

  // Robust line-by-line parsing logic
  const parseDiagnosis = (text: string): DiagnosisSection[] => {
    const lines = text.split('\n');
    const sections: DiagnosisSection[] = [];

    let currentTitle = t.problemDescription || "Overview";
    let currentContent: string[] = [];
    let currentType: DiagnosisSection['type'] = 'default';

    // Helper to determine section type from title
    const getSectionType = (title: string): DiagnosisSection['type'] => {
      const lower = title.toLowerCase();
      if (lower.includes("issue") || lower.includes("problem") || lower.includes("disease") || lower.includes("समस्या")) return 'issue';
      if (lower.includes("severity") || lower.includes("risk") || lower.includes("गंभीरता")) return 'severity';
      if (lower.includes("prevention") || lower.includes("prevent") || lower.includes("avoid") || lower.includes("रोकथाम")) return 'prevention';
      if (lower.includes("recommendation") || lower.includes("treatment") || lower.includes("solution") || lower.includes("step") || lower.includes("इलाज")) return 'treatment';
      if (lower.includes("recovery") || lower.includes("time") || lower.includes("पुनर्प्राप्ति")) return 'recovery';
      return 'default';
    }

    const startNewSection = (title: string, firstLine?: string) => {
      // Flush old
      if (currentContent.length > 0 || (sections.length === 0 && currentType === 'default')) { // always save the first default section if it has content or we need to clear it
        // Clean up
        const cleanedContent = currentContent.filter(l => l.trim().length > 0);
        if (cleanedContent.length > 0) {
          sections.push({
            id: `section-${sections.length}-${Math.random().toString(36).substr(2, 9)}`,
            title: currentTitle,
            content: cleanedContent,
            type: currentType
          });
        }
      }

      // Start new
      currentTitle = title;
      currentType = getSectionType(title);
      currentContent = firstLine ? [firstLine] : [];
    };

    // Regex for:
    // 1. **Title** or **Title:**
    // 2. ## Title
    // 3. 1. **Title**
    const headerRegex = /^(?:[\d\-\.\)]+\s*)?(?:\*\*|##|__)(.*?)(?:\*\*|##|__)?(?::)?\s*(.*)$/i;
    // Simple bold regex: **Text** at start of line

    for (const line of lines) {
      const match = line.match(headerRegex);
      // Check if it looks like a header (non-empty capture)
      if (match && match[1] && match[1].trim().length > 0 && match[1].trim().length < 50) {
        // match[1] is title, match[2] is remainder
        const formattedTitle = match[1].trim();
        const remainder = match[2]?.trim();
        startNewSection(formattedTitle, remainder);
      } else {
        const trimmed = line.trim();
        // Skip purely numeric lines that might be leftover lists "1."
        if (trimmed && !trimmed.match(/^\d+[\.)]$/)) {
          currentContent.push(line);
        }
      }
    }

    // Flush final
    const cleanedContent = currentContent.filter(l => l.trim().length > 0);
    if (cleanedContent.length > 0) {
      sections.push({
        id: `section-${sections.length}-${Math.random().toString(36).substr(2, 9)}`,
        title: currentTitle,
        content: cleanedContent,
        type: currentType
      });
    }

    return sections;
  }

  const sections = parseDiagnosis(diagnosis)

  const getSectionStyle = (type: DiagnosisSection['type']) => {
    switch (type) {
      case 'issue':
        return {
          icon: <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />,
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-200 dark:border-red-900/30",
          titleColor: "text-red-700 dark:text-red-300",
          shadow: "shadow-red-500/10"
        }
      case 'severity':
        return {
          icon: <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
          bg: "bg-amber-50 dark:bg-amber-950/20",
          border: "border-amber-200 dark:border-amber-900/30",
          titleColor: "text-amber-700 dark:text-amber-300",
          shadow: "shadow-amber-500/10"
        }
      case 'treatment':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
          bg: "bg-blue-50 dark:bg-blue-950/20",
          border: "border-blue-200 dark:border-blue-900/30",
          titleColor: "text-blue-700 dark:text-blue-300",
          shadow: "shadow-blue-500/10"
        }
      case 'prevention':
        return {
          icon: <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
          bg: "bg-emerald-50 dark:bg-emerald-950/20",
          border: "border-emerald-200 dark:border-emerald-900/30",
          titleColor: "text-emerald-700 dark:text-emerald-300",
          shadow: "shadow-emerald-500/10"
        }
      case 'recovery':
        return {
          icon: <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
          bg: "bg-purple-50 dark:bg-purple-950/20",
          border: "border-purple-200 dark:border-purple-900/30",
          titleColor: "text-purple-700 dark:text-purple-300",
          shadow: "shadow-purple-500/10"
        }
      default:
        return {
          icon: <Info className="w-6 h-6 text-gray-600 dark:text-gray-400" />,
          bg: "bg-gray-50 dark:bg-gray-900/20",
          border: "border-gray-200 dark:border-gray-800",
          titleColor: "text-gray-700 dark:text-gray-300",
          shadow: "shadow-gray-500/10"
        }
    }
  }

  // Helper to format inline markdown bold/italic
  const formatText = (text: string) => {
    // Split by bold markers (**...**) first
    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, i) => {
      // Handle Bold (**...**)
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="font-bold text-primary/90">
            {part.slice(2, -2)}
          </span>
        );
      }

      // Handle Italic (*...*) potentially inside non-bold parts
      const subParts = part.split(/(\*[^\s*][^*]*?\*)/g);

      return (
        <span key={i}>
          {subParts.map((subPart, j) => {
            if (subPart.startsWith('*') && subPart.endsWith('*') && subPart.length > 2) {
              return (
                <span key={j} className="italic text-foreground/80 font-medium">
                  {subPart.slice(1, -1)}
                </span>
              );
            }
            return subPart;
          })}
        </span>
      );
    });
  };

  const renderSection = (section: DiagnosisSection, className?: string) => {
    const style = getSectionStyle(section.type);

    return (
      <div
        key={section.id}
        className={cn(
          "rounded-xl border p-5 transition-all duration-300 hover:shadow-md",
          style.bg, style.border, style.shadow,
          className
        )}
      >
        <div className="flex items-start gap-4 mb-3">
          <div className={cn("p-2 rounded-lg bg-background/60 backdrop-blur-sm")}>
            {style.icon}
          </div>
          <h3 className={cn("text-lg font-bold leading-none mt-2", style.titleColor)}>{section.title}</h3>
        </div>

        <div className="space-y-2 pl-2">
          {section.content.map((line, idx) => {
            const trimmed = line.trim();

            // Handle sub-headers (###) content
            if (trimmed.startsWith('###')) {
              return (
                <h4 key={idx} className="text-base font-bold text-foreground mt-3 mb-1">
                  {formatText(trimmed.replace(/^###\s*/, ''))}
                </h4>
              );
            }

            const isBullet = line.trim().startsWith("-") || line.trim().startsWith("*") || line.trim().match(/^\d+\./);
            const cleanLine = line.replace(/^[\-\*]\s*/, ""); // Keep numbers for steps

            return (
              <div key={idx} className={cn("text-foreground/80 leading-relaxed text-sm", isBullet && "pl-2")}>
                {isBullet ? (
                  <div className="flex gap-2">
                    <span className={cn("mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current opacity-60")} />
                    <span>{formatText(cleanLine)}</span>
                  </div>
                ) : (
                  <p>{formatText(cleanLine)}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Group sections for layout
  const issueSections = sections.filter(s => s.type === 'issue');
  const severitySections = sections.filter(s => s.type === 'severity');
  // Combine issues and severity for the top row, if both exist

  const treatmentSections = sections.filter(s => s.type === 'treatment');
  const otherSections = sections.filter(s => !['issue', 'severity', 'treatment'].includes(s.type));

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* 1. Header Card */}
      <div className="relative bg-card rounded-xl border shadow-sm p-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <div className="flex items-center gap-3 mb-2">
          <Leaf className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">{t.diagnosisResult}</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          {new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}
        </p>
      </div>

      {sections.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Key Findings: Issue & Severity */}
          <div className="space-y-4 md:col-span-1">
            {issueSections.length > 0 ? issueSections.map(s => renderSection(s)) : null}
            {/* Fallback if no specific issue section, check Other/Overview */}
            {issueSections.length === 0 && otherSections.length > 0 && otherSections[0].title === "Overview" && renderSection(otherSections[0])}
          </div>

          <div className="space-y-4 md:col-span-1">
            {severitySections.map(s => renderSection(s))}
            {/* If we moved overview to col 1, don't repeat it here. */}
          </div>

          {/* Treatment/Recommendations - Full Width */}
          {treatmentSections.length > 0 && (
            <div className="md:col-span-2 space-y-4">
              {treatmentSections.map(s => renderSection(s))}
            </div>
          )}

          {/* Others (Prevention, Recovery, etc - excluding Overview if we used it) */}
          {otherSections.map(s => {
            if (s.title === "Overview" && issueSections.length === 0) return null; // Already rendered
            return renderSection(s, "md:col-span-1 border-dashed");
          })}
        </div>
      ) : (
        // Fallback if parsing fails totally
        <div className="p-6 bg-card rounded-xl border border-dashed">
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground/80">{diagnosis}</pre>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground pt-4">
        {t.disclaimer}
      </p>
    </div>
  )
}
