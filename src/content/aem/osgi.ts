import type { TopicContent } from '../types';

export const osgi: TopicContent = {
  slug: 'osgi',
  title: 'OSGi',
  description: 'Understand OSGi — the module system that powers AEM. Learn what bundles, services, and components are, and how they work together in a real project.',
  applicableVersions: ['AEM 6.x', 'AEM as a Cloud Service'],
  lastReviewed: 'December 2024',
  quickUnderstanding: 'OSGi is the plugin system that AEM runs on. Think of it like a smartphone\'s app store — AEM is the phone, and OSGi bundles are the apps. Each bundle is a JAR file with its own dependencies, lifecycle, and services. They can be installed, started, stopped, and updated without restarting AEM.',
  whatIsIt: `OSGi (Open Services Gateway initiative) is a **modular Java framework** that AEM uses as its runtime. It provides:

- **Bundle System** — JAR files with metadata that can be deployed independently
- **Service Registry** — A registry where bundles publish and consume services
- **Component Model** — Java classes (components) that are activated/deactivated by OSGi
- **Configuration Admin** — A way to configure services without changing code
- **Lifecycle Management** — Bundles can be installed, started, stopped, and updated at runtime

AEM itself is a collection of OSGi bundles. Your custom code is also packaged as OSGi bundles. The Felix console at \`/system/console\` is where you manage all of this.`,
  whyWeNeedIt: `**Without OSGi:**
- All code runs in one big monolith
- Updating one class requires restarting the entire server
- No clean way to manage dependencies between modules
- No runtime configuration without code changes

**With OSGi:**
- Deploy your bundle without restarting AEM
- Each bundle manages its own dependencies
- Services are loosely coupled — easy to swap implementations
- Configuration can be changed at runtime via the Felix console
- Third-party libraries are isolated — no classpath conflicts

In AEM projects, OSGi is where your **business logic lives** — services that call APIs, process data, send emails, or connect to databases.`,
  realWorldUsage: `**Real Project Usage:**

**OSGi Services:**
- EmailService — sends transactional emails
- SearchService — queries the JCR or external search
- ProductService — fetches product data from a PIM system
- TranslationService — integrates with a translation API
- CacheService — manages application-level caching

**OSGi Configuration:**
- API endpoints (different for dev/staging/prod)
- Feature flags
- Cache TTL values
- Email server settings
- Third-party API keys

**In your AEM Maven project:**
Your custom code lives in the \`core\` module, which builds to an OSGi bundle (JAR). This bundle is packaged in your content package and deployed to AEM.`,
  howItWorks: `**Bundle Lifecycle:**

1. **Installed** — Bundle JAR is in AEM but dependencies aren't resolved yet
2. **Resolved** — All dependencies are satisfied
3. **Starting** — Bundle's activator is running
4. **Active** — Bundle is running normally
5. **Stopping** — Bundle is shutting down
6. **Uninstalled** — Bundle is removed

**OSGi Components (@Component):**
A class annotated with \`@Component\` is managed by OSGi. It has:
- \`@Activate\` — runs when the component starts
- \`@Deactivate\` — runs when the component stops
- \`@Modified\` — runs when configuration changes

**OSGi Services (@Service):**
A component that implements an interface and is registered in the service registry. Other components can inject it using \`@Reference\`.

**OSGi Configuration:**
Configuration is stored in the JCR under \`/apps/myproject/config/\` or in \`/conf\`. Different configurations for different environments (author, publish, dev, prod) are managed via run modes.

**Run Modes:**
- \`/apps/myproject/config/\` — applies to all environments
- \`/apps/myproject/config.author/\` — author only
- \`/apps/myproject/config.publish/\` — publish only
- \`/apps/myproject/config.dev/\` — dev environment only`,
  example: {
    title: 'Creating an OSGi Service',
    description: 'A complete example of an OSGi service with configuration, from interface to implementation.',
    code: [
      {
        label: 'Service Interface',
        language: 'java',
        code: `package com.myproject.core.services;

/**
 * Service for sending transactional emails.
 * Keeps the interface clean — callers don't need to know
 * how emails are sent (SMTP, SendGrid, etc.)
 */
public interface EmailService {

    /**
     * Sends an email to the specified recipient.
     * @return true if sent successfully, false otherwise
     */
    boolean sendEmail(String to, String subject, String body);

    /**
     * Sends a templated email using an AEM email template.
     */
    boolean sendTemplatedEmail(String to, String templatePath,
                               Map<String, String> variables);
}`,
      },
      {
        label: 'Service Implementation',
        language: 'java',
        code: `package com.myproject.core.services.impl;

import org.osgi.service.component.annotations.*;
import org.osgi.service.metatype.annotations.*;
import com.myproject.core.services.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component(
    service = EmailService.class,
    immediate = true
)
@Designate(ocd = EmailServiceImpl.Config.class)
public class EmailServiceImpl implements EmailService {

    private static final Logger LOG =
        LoggerFactory.getLogger(EmailServiceImpl.class);

    // OSGi Configuration interface
    @ObjectClassDefinition(name = "My Project - Email Service")
    public @interface Config {
        @AttributeDefinition(name = "SMTP Host")
        String smtpHost() default "localhost";

        @AttributeDefinition(name = "SMTP Port")
        int smtpPort() default 587;

        @AttributeDefinition(name = "From Address")
        String fromAddress() default "noreply@mysite.com";

        @AttributeDefinition(name = "Enable SSL")
        boolean enableSsl() default true;
    }

    private String smtpHost;
    private int smtpPort;
    private String fromAddress;

    @Activate
    @Modified
    protected void activate(Config config) {
        this.smtpHost = config.smtpHost();
        this.smtpPort = config.smtpPort();
        this.fromAddress = config.fromAddress();
        LOG.info("EmailService activated with host: {}", smtpHost);
    }

    @Deactivate
    protected void deactivate() {
        LOG.info("EmailService deactivated");
    }

    @Override
    public boolean sendEmail(String to, String subject, String body) {
        try {
            // Email sending logic here
            LOG.debug("Sending email to {} via {}:{}", to, smtpHost, smtpPort);
            return true;
        } catch (Exception e) {
            LOG.error("Failed to send email to {}", to, e);
            return false;
        }
    }

    @Override
    public boolean sendTemplatedEmail(String to, String templatePath,
                                      Map<String, String> variables) {
        // Template processing logic
        return true;
    }
}`,
      },
      {
        label: 'OSGi Configuration (config.xml)',
        language: 'xml',
        code: `<!-- File: /apps/myproject/config/
     com.myproject.core.services.impl.EmailServiceImpl.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="sling:OsgiConfig"
    smtpHost="smtp.sendgrid.net"
    smtpPort="{Long}587"
    fromAddress="noreply@mysite.com"
    enableSsl="{Boolean}true"/>

<!-- For publish environment:
     /apps/myproject/config.publish/
     com.myproject.core.services.impl.EmailServiceImpl.xml -->
<jcr:root ...
    smtpHost="smtp-publish.sendgrid.net"
    smtpPort="{Long}587"/>`,
      },
      {
        label: 'Injecting the Service in a Sling Model',
        language: 'java',
        code: `@Model(
    adaptables = SlingHttpServletRequest.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class ContactFormModel {

    // Inject the OSGi service into the Sling Model
    @OSGiService
    private EmailService emailService;

    @ValueMapValue
    private String recipientEmail;

    public boolean submitForm(String name, String message) {
        if (emailService == null) {
            LOG.error("EmailService not available");
            return false;
        }
        return emailService.sendEmail(
            recipientEmail,
            "New Contact Form Submission from " + name,
            message
        );
    }
}`,
      },
    ],
  },
  commonConfusions: [
    {
      question: 'What is the difference between @Component and @Service in OSGi?',
      answer: '@Component marks a class as managed by OSGi (lifecycle management). @Service (or service = MyInterface.class in @Component) registers it in the OSGi service registry so other components can inject it. Every service is a component, but not every component is a service.',
    },
    {
      question: 'Why is my OSGi bundle in "Installed" state instead of "Active"?',
      answer: 'Usually means unresolved dependencies — a package your bundle imports isn\'t exported by any other bundle. Check the Felix console (/system/console/bundles) and click on your bundle to see which imports are missing.',
    },
    {
      question: 'What is the difference between @Activate and @PostConstruct?',
      answer: '@Activate is an OSGi lifecycle method — it runs when the OSGi component starts and receives OSGi configuration. @PostConstruct is a Sling Model lifecycle method — it runs after all injections complete. They\'re different frameworks.',
    },
    {
      question: 'How do I configure different settings for Author vs Publish?',
      answer: 'Use run mode folders: /apps/myproject/config/ for shared config, /apps/myproject/config.author/ for author-only, /apps/myproject/config.publish/ for publish-only. AEM automatically loads the right config based on the instance type.',
    },
  ],
  productionIssues: [
    'Bundle in "Installed" state — missing dependency. Check /system/console/bundles and look for unresolved imports.',
    'Service returns null in Sling Model — the bundle is not active, or the service interface doesn\'t match. Check Felix console.',
    'Configuration not loading — OSGi config file name must exactly match the PID (class name). One character difference means it won\'t load.',
    'NullPointerException in @Activate — configuration value is null. Always provide defaults in the @ObjectClassDefinition.',
    'Service works on Author but not Publish — the bundle is deployed to Author but not Publish, or the config in config.publish/ is wrong.',
    'Cloud Service config works in Dev but not Stage/Prod — a Cloud Manager variable or secret is missing, scoped to the wrong service, or named differently than the OSGi placeholder.',
    'Thread-safety issue under load — an OSGi service stores request-specific mutable state in fields. Services are shared and must be treated as singleton components.',
    'External integration causes slow pages — service has no timeout, retry limit, or fallback behavior for downstream API failures.',
  ],
  bestPractices: [
    'Always define a service interface separate from the implementation — it makes testing and swapping implementations easy.',
    'Use @Activate/@Modified with the same method to handle both initial activation and configuration changes.',
    'Always provide sensible defaults in @ObjectClassDefinition — never let a service fail because a config value is missing.',
    'Use SLF4J Logger (not System.out) for all logging in OSGi services.',
    'Keep services focused on one responsibility — don\'t create a "GodService" that does everything.',
    'Use @Reference(cardinality = ReferenceCardinality.OPTIONAL) for optional service dependencies.',
    'Keep OSGi services stateless or protect shared state with clear concurrency rules.',
    'In AEM as a Cloud Service, keep stable non-secret values in JSON configs and use Cloud Manager secrets only for sensitive values.',
    'Add health-check style logging for critical integrations so support teams can quickly distinguish config issues from downstream outages.',
  ],
  architectNote: `OSGi is the **backbone of AEM's extensibility**. Understanding it deeply separates senior AEM developers from junior ones.

**Service Design Principles:**
- Design services around **interfaces**, not implementations
- Keep services **stateless** when possible — state in services causes threading issues
- Use OSGi configuration for **environment-specific values** (API keys, endpoints, feature flags)

**For AEM as a Cloud Service:** OSGi configuration is deployed as code using JSON configs. Cloud Manager environment variables and secrets are used for values that cannot or should not be committed to Git, especially secrets and values that differ by environment.

**Testing OSGi Services:** Use the AemContext from wcm.io testing to register mock services. This is critical — services that call external APIs must be testable without hitting real APIs.`,
  faqs: [
    {
      question: 'What is the Felix Console and when do I use it?',
      answer: 'The Felix Console (/system/console) is AEM\'s OSGi management UI. Use it to: check bundle states, view OSGi configurations, see service registrations, check log levels, and debug deployment issues. It\'s only accessible on Author (never expose it on Publish).',
    },
    {
      question: 'What is a Sling Scheduler and how does it relate to OSGi?',
      answer: 'A Sling Scheduler is an OSGi component that runs on a schedule (like a cron job). Implement the Runnable interface, annotate with @Component, and use @Designate with a schedule configuration. It\'s how AEM handles background tasks.',
    },
    {
      question: 'How do I read OSGi configuration values in a Sling Model?',
      answer: 'Don\'t read OSGi config directly in a Sling Model. Instead, create an OSGi service that reads the config and exposes it via a method. Inject that service into your Sling Model with @OSGiService.',
    },
    {
      question: 'What is a Sling Event Handler?',
      answer: 'An OSGi component that listens for events in AEM (page published, asset uploaded, user logged in, etc.). Implement EventHandler interface and register with @Component(property = EventConstants.EVENT_TOPIC + "=..."). Used for triggering actions when content changes.',
    },
  ],
  keyTakeaways: [
    'OSGi is AEM\'s module system — bundles are JAR files with lifecycle management',
    '@Component manages lifecycle; service = MyInterface.class registers in service registry',
    'Use run mode folders for environment-specific configuration',
    'Bundle must be "Active" for its services to be available',
    'Always define service interfaces separate from implementations',
    'Felix Console (/system/console) is your debugging tool for OSGi issues',
  ],
  relatedTopics: ['sling-models', 'sling', 'components', 'aem-cloud-service'],
};
