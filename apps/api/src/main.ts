import "reflect-metadata";
import { startTracing } from "./observability/tracing";

startTracing();

void import("./bootstrap").then(({ bootstrap }) => bootstrap());
