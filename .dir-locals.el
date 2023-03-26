;; see https://yarnpkg.com/getting-started/editor-sdks
((nil
  . ((eval . (let ((project-directory (car (dir-locals-find-file default-directory))))
               (setq lsp-clients-typescript-server-args
                     `("--tsserver-path" ,(concat project-directory ".yarn/sdks/typescript/bin/tsserver") "--stdio"))
               (setq flycheck-javascript-eslint-executable
                     (concat project-directory "bin/eslint"))
               (setq tide-tsserver-executable
                     (concat project-directory ".yarn/sdks/typescript/bin/tsserver")))))))
