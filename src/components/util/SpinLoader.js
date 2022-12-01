import { motion } from "framer-motion";
import { Button, Spinner } from "reactstrap";

import styles from "./SpinLoader.module.css";

const SpinLoader = () => {
  return (
    <div className={styles.loader}>
      <Button color="primary" disabled>
        <motion.div
          animate={{
            opacity: [1, 0.5, 0, 0.5, 1],
            // scale: [0.5, 1, 0.5],
          }}
          transition={{
            // time: [0.1, 0.2, 0.5, 0.2],
            repeat: [Infinity],
            duration: 2,
          }}
        >
          <Spinner color="light" size="sm" /> <span>Loading...</span>
        </motion.div>
      </Button>
    </div>
  );
};

export default SpinLoader;
