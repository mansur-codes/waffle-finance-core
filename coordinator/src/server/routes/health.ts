import { Router } from "express";
import type { ReconciliationStatus } from "../../reconciliation/reconciler.js";

export function healthRoutes(
  getReconciliationStatus?: () => ReconciliationStatus
): Router {
  const router = Router();
  const startedAt = Date.now();

  router.get("/health", (_req, res) => {
    const reconciliation = getReconciliationStatus?.() ?? null;
    res.json({
      status: "ok",
      service: "wafflefinance-coordinator",
      version: process.env.npm_package_version ?? "0.1.0",
      uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
      timestamp: new Date().toISOString(),
      reconciliation
    });
  });

  return router;
}
