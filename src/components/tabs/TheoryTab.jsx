import { motion } from "framer-motion";
import { FileSymlink, Network, Settings2 } from "lucide-react";
import { BlockMath, InlineMath } from "react-katex";
import tsImage from "../../assets/ts.webp";

const TheoryCard = ({ icon, title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    style={{
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid var(--glass-border)",
      borderRadius: "12px",
      padding: "2rem",
      marginBottom: "1.5rem",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "1rem",
        color: "var(--primary)",
      }}
    >
      {icon}
      <h3 style={{ fontSize: "1.5rem", color: "var(--text-main)" }}>{title}</h3>
    </div>
    <div style={{ color: "var(--text-muted)", lineHeight: "1.7" }}>
      {children}
    </div>
  </motion.div>
);

const TheoryTab = () => {
  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            color: "var(--accent)",
          }}
        >
          Theory & Formulas
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          Understanding the mathematical representation and the two main types
          of Transfer Learning.
        </p>
      </div>

      <TheoryCard
        icon={<FileSymlink size={24} />}
        title="1. Introduction To Transfer Learning"
        delay={0.1}
      >
        <p>
          Transfer learning is a technique where a model trained on one task is
          reused for a related task, especially when the new task has limited
          data.
        </p>
      </TheoryCard>

      <TheoryCard
        icon={<FileSymlink size={24} />}
        title="1. Transfer Learning Formula"
        delay={0.1}
      >
        <p>
          Transfer learning can be represented as moving from a Source Domain (
          <InlineMath math="D_S" />) and Task (<InlineMath math="T_S" />) to a
          Target Domain (<InlineMath math="D_T" />) and Task (
          <InlineMath math="T_T" />
          ):
        </p>
        <BlockMath math="D_S, T_S \rightarrow D_T, T_T" />
        <p>The primary goal is to predict the Target Probability:</p>
        <BlockMath math="P(Y_T \mid X_T)" />
        <p>using knowledge learned from the Source Probability:</p>
        <BlockMath math="P(Y_S \mid X_S)" />
      </TheoryCard>

      <TheoryCard
        icon={<Network size={24} />}
        title="2. Type I: Fixed Feature Extractor"
        delay={0.3}
      >
        <p>
          In this approach, we use a pretrained model, freeze its layers,
          extract features, and train only a new classifier on top.
        </p>
        <ul
          style={{
            paddingLeft: "1.5rem",
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <li>
            Let <InlineMath math="x" /> be the input image.
          </li>
          <li>
            Let <InlineMath math="\theta_p" /> be the pretrained weights (which
            are frozen).
          </li>
          <li>
            Let <InlineMath math="\theta_c" /> be the parameters of the new
            classifier.
          </li>
        </ul>
        <p>First, we extract features using the pretrained model:</p>
        <BlockMath math="z = f(x; \theta_p)" />
        <p>Then, a new classifier is trained using these features:</p>
        <BlockMath math="\hat{y} = g(z; \theta_c) \quad \text{or} \quad \hat{y} = g(f(x; \theta_p); \theta_c)" />
      </TheoryCard>

      <TheoryCard
        icon={<Settings2 size={24} />}
        title="3. Type II: Fine-Tuning a Pretrained Model"
        delay={0.5}
      >
        <p>
          In this approach, we start with a pretrained model and unfreeze some
          or all of its layers, continuing the training on our new dataset.
        </p>
        <BlockMath math="\hat{y} = g(f(x; \theta_p); \theta_c)" />
        <p>
          While the formula looks similar to the combined feature extractor
          formula, the crucial difference is that{" "}
          <strong>
            both the classifier (<InlineMath math="\theta_c" />) and some or all
            of the pretrained layers (<InlineMath math="\theta_p" />) are
            updated
          </strong>{" "}
          during training.
        </p>
      </TheoryCard>

      <TheoryCard
        icon={<Settings2 size={24} />}
        title="4. Frozen vs Trainable Layers"
        delay={0.7}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <img
            src={tsImage}
            alt="Transfer Learning Diagram"
            style={{
              maxWidth: "100%",
              borderRadius: "12px",
              border: "1px solid var(--glass-border)",
            }}
          />
        </div>

        <div style={{ overflowX: "auto", marginTop: "1rem" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              color: "var(--text-main)",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <th style={{ padding: "1rem", color: "var(--primary)" }}>
                  Aspect
                </th>
                <th style={{ padding: "1rem", color: "var(--primary)" }}>
                  Frozen Layers
                </th>
                <th style={{ padding: "1rem", color: "var(--primary)" }}>
                  Trainable Layers
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>
                  Definition
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Layers whose weights are kept fixed and not updated during
                  training
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Layers whose weights are updated during training
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>Purpose</td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Preserve general features learned from large pre-trained
                  datasets
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Adapt to task-specific features of the new dataset
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>
                  Learning Process
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  No backpropagation updates; remain constant
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Updated through backpropagation based on new data
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>
                  Use Case
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Used when new dataset is small or similar to the original
                  dataset
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Used when new dataset is large or significantly different from
                  the original task
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--glass-border)" }}>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>
                  Computation Cost
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Lower, since fewer parameters are trained
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Higher, as more parameters need to be updated
                </td>
              </tr>
              <tr>
                <td style={{ padding: "1rem", fontWeight: "bold" }}>
                  Example in CNN
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Early convolutional layers that capture edges, textures and
                  basic shapes
                </td>
                <td style={{ padding: "1rem", color: "var(--text-muted)" }}>
                  Later fully connected layers or deeper convolutional layers
                  for fine-tuned features
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TheoryCard>
    </div>
  );
};

export default TheoryTab;
